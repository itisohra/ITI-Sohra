import { sourceFiles } from './backupProject';

export interface GitHubDeployProgress {
  step: 'auth' | 'repo' | 'upload' | 'tree' | 'commit' | 'pages' | 'done';
  message: string;
}

export async function deployToGitHub({
  token,
  repoName = 'iti-sohra',
  onProgress
}: {
  token: string;
  repoName: string;
  onProgress: (status: GitHubDeployProgress) => void;
}): Promise<{ repoUrl: string; pagesUrl: string; username: string }> {
  const cleanToken = token.trim();

  // 1. Verify token & get username
  onProgress({ step: 'auth', message: 'Connecting to your GitHub account...' });
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
      Accept: 'application/vnd.github+json'
    }
  });

  if (!userRes.ok) {
    let errMsg = 'Invalid GitHub Token.';
    try {
      const err = await userRes.json();
      if (err.message) errMsg = err.message;
    } catch {}
    throw new Error(`${errMsg} Please check that your token has "repo" and "workflow" scopes.`);
  }

  const userData = await userRes.json();
  const username: string = userData.login;

  // 2. Create or verify repository
  onProgress({ step: 'repo', message: `Checking or creating repository "${repoName}" for ${username}...` });
  const repoRes = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
      Accept: 'application/vnd.github+json'
    }
  });

  if (repoRes.status === 404) {
    onProgress({ step: 'repo', message: `Creating public repository "${repoName}" on your GitHub...` });
    const createRes = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: repoName,
        description: 'Official Web Portal of Government ITI Sohra, Meghalaya (DECT)',
        private: false,
        auto_init: true
      })
    });

    if (!createRes.ok) {
      const err = await createRes.json();
      throw new Error(`Failed to create repository: ${err.message || 'Check token permissions.'}`);
    }
    // Give GitHub a brief second to initialize
    await new Promise((r) => setTimeout(r, 1500));
  }

  // 3. Upload/Commit all files via Git Blobs API
  onProgress({ step: 'upload', message: 'Uploading portal source code and deployment workflows...' });
  const entries: Array<{ path: string; mode: string; type: string; sha: string }> = [];
  const filesList = Object.entries(sourceFiles);

  for (let i = 0; i < filesList.length; i += 6) {
    const batch = filesList.slice(i, i + 6);
    await Promise.all(
      batch.map(async ([rawPath, content]) => {
        const filePath = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath;
        if (typeof content !== 'string') return;

        const blobRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/git/blobs`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content,
            encoding: 'utf-8'
          })
        });

        if (blobRes.ok) {
          const blobData = await blobRes.json();
          entries.push({
            path: filePath,
            mode: '100644',
            type: 'blob',
            sha: blobData.sha
          });
        }
      })
    );
    onProgress({
      step: 'upload',
      message: `Uploaded ${Math.min(i + 6, filesList.length)} of ${filesList.length} files...`
    });
  }

  // 4. Create Git Tree
  onProgress({ step: 'tree', message: 'Building Git commit tree on GitHub...' });
  const treeRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/git/trees`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cleanToken}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tree: entries })
  });

  if (!treeRes.ok) {
    const err = await treeRes.json();
    throw new Error(`Failed to create Git tree: ${err.message}`);
  }
  const treeData = await treeRes.json();

  // 5. Get parent commit if exists
  let parentCommitSha: string | undefined = undefined;
  try {
    const refRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/git/refs/heads/main`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        Accept: 'application/vnd.github+json'
      }
    });
    if (refRes.ok) {
      const refData = await refRes.json();
      parentCommitSha = refData.object.sha;
    }
  } catch {}

  // 6. Create Commit
  onProgress({ step: 'commit', message: 'Creating release commit on main branch...' });
  const commitRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/git/commits`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cleanToken}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Official Release: Government ITI Sohra Web Portal & Database Integration',
      tree: treeData.sha,
      parents: parentCommitSha ? [parentCommitSha] : []
    })
  });

  if (!commitRes.ok) {
    const err = await commitRes.json();
    throw new Error(`Failed to create commit: ${err.message}`);
  }
  const commitData = await commitRes.json();

  // 7. Update branch ref
  const updateRefRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/git/refs/heads/main`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${cleanToken}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sha: commitData.sha,
      force: true
    })
  });

  if (!updateRefRes.ok) {
    // If refs/heads/main does not exist, create it
    await fetch(`https://api.github.com/repos/${username}/${repoName}/git/refs`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ref: 'refs/heads/main',
        sha: commitData.sha
      })
    });
  }

  // 8. Enable GitHub Pages with workflow
  onProgress({ step: 'pages', message: 'Enabling free GitHub Pages hosting...' });
  try {
    await fetch(`https://api.github.com/repos/${username}/${repoName}/pages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        build_type: 'workflow'
      })
    });
  } catch {}

  onProgress({ step: 'done', message: 'Website launched successfully on GitHub!' });

  return {
    username,
    repoUrl: `https://github.com/${username}/${repoName}`,
    pagesUrl: `https://${username}.github.io/${repoName}`
  };
}
