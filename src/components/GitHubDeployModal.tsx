import React, { useState } from 'react';
import {
  X,
  Github,
  Globe,
  Rocket,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Key,
  FolderGit2,
  HelpCircle,
  Loader2,
  Copy
} from 'lucide-react';
import { deployToGitHub, GitHubDeployProgress } from '../utils/githubDeploy';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState('');
  const [repoName, setRepoName] = useState('iti-sohra');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<GitHubDeployProgress | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<{ repoUrl: string; pagesUrl: string; username: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setErrorMessage('Please enter your GitHub Personal Access Token.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    setProgress({ step: 'auth', message: 'Connecting to your GitHub account...' });

    try {
      const res = await deployToGitHub({
        token: token.trim(),
        repoName: repoName.trim() || 'iti-sohra',
        onProgress: (p) => setProgress(p)
      });
      setResult(res);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white border border-[#ccc] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col rounded-md animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-[#181717] text-white px-5 py-4 flex items-center justify-between border-b-2 border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold m-0 leading-tight">
                Launch to GitHub Pages (100% Free)
              </h3>
              <p className="text-[11px] text-white/70 m-0 mt-0.5">
                Automatically deploy Govt. ITI Sohra portal to your personal GitHub account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {result ? (
            /* Success View */
            <div className="space-y-4 py-2">
              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-5 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-950 m-0">
                    🎉 Successfully Launched to GitHub!
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                    Your repository has been created, all code has been committed, and free GitHub Pages hosting is enabled.
                  </p>
                </div>

                {/* Published URL Box */}
                <div className="bg-white border border-emerald-300 rounded-md p-3.5 text-left space-y-1 shadow-2xs">
                  <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your Live Website URL:</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-emerald-50/60 p-2 rounded-xs border border-emerald-200">
                    <a
                      href={result.pagesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs sm:text-sm font-bold text-[#004a99] hover:underline break-all"
                    >
                      {result.pagesUrl}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(result.pagesUrl)}
                      className="text-xs font-bold text-emerald-800 bg-white border border-emerald-300 px-2 py-1 rounded-xs hover:bg-emerald-50 shrink-0 cursor-pointer inline-flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-[#666] m-0 pt-1">
                    *(GitHub Actions takes about 60–90 seconds to complete its initial automated build).*
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <a
                    href={result.pagesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-md text-xs inline-flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Live Website</span>
                  </a>
                  <a
                    href={result.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold py-2.5 px-3.5 rounded-md text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Repo</span>
                  </a>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-md cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Setup & Launch Form */
            <form onSubmit={handleDeploy} className="space-y-4">
              
              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-md text-xs text-blue-950 flex items-start gap-2.5">
                <Rocket className="w-4 h-4 text-[#004a99] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Automated Free Deployment:</strong> This tool will automatically connect to your GitHub ID, create the repository, push all code files, and configure free GitHub Pages hosting.
                </div>
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-300 p-3 rounded-md text-xs text-red-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 font-medium">{errorMessage}</div>
                </div>
              )}

              {/* Repository Name */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1 flex items-center gap-1">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#004a99]" />
                  <span>Repository Name on GitHub</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isLoading}
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-'))}
                  placeholder="e.g. iti-sohra"
                  className="w-full p-2.5 bg-slate-50 border border-[#ccc] rounded-xs font-mono text-xs sm:text-sm focus:outline-none focus:border-[#004a99] focus:bg-white"
                />
                <p className="text-[11px] text-[#666] mt-1">
                  Your website address will be: <code className="text-[#004a99] font-bold">https://&lt;your-id&gt;.github.io/{repoName || 'iti-sohra'}</code>
                </p>
              </div>

              {/* GitHub Personal Access Token */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-amber-600" />
                    <span>Your GitHub Personal Access Token (Classic) *</span>
                  </label>
                  <a
                    href="https://github.com/settings/tokens/new?scopes=repo,workflow&description=Govt+ITI+Sohra+Website+Deploy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#004a99] hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>Generate Token on GitHub ↗</span>
                  </a>
                </div>

                <input
                  type="password"
                  required
                  disabled={isLoading}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full p-2.5 bg-slate-50 border border-[#ccc] rounded-xs font-mono text-xs sm:text-sm focus:outline-none focus:border-[#004a99] focus:bg-white"
                />

                {/* 30-second Help note on how to get token */}
                <div className="mt-2 bg-slate-50 border border-slate-200 p-3 rounded-xs text-[11px] text-slate-700 space-y-1">
                  <strong>How to get your token in 30 seconds:</strong>
                  <ol className="list-decimal ml-4 space-y-0.5">
                    <li>
                      Click{' '}
                      <a
                        href="https://github.com/settings/tokens/new?scopes=repo,workflow&description=Govt+ITI+Sohra+Website+Deploy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#004a99] font-bold underline"
                      >
                        this direct GitHub link
                      </a>{' '}
                      (log in to GitHub if prompted).
                    </li>
                    <li>Scroll to the bottom and click the green <strong>"Generate token"</strong> button.</li>
                    <li>Copy the token (starts with <code>ghp_</code>) and paste it into the box above.</li>
                  </ol>
                </div>
              </div>

              {/* Progress Indicator when Launching */}
              {isLoading && progress && (
                <div className="bg-indigo-50 border border-indigo-200 p-3.5 rounded-md space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
                    <Loader2 className="w-4 h-4 animate-spin text-[#004a99]" />
                    <span>{progress.message}</span>
                  </div>
                  <div className="w-full bg-indigo-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#004a99] h-full w-2/3 animate-pulse rounded-full" />
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#eee]">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={onClose}
                  className="px-4 py-2 border border-[#ccc] text-[#555] hover:bg-[#eee] rounded-xs text-xs font-semibold cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading || !token.trim()}
                  className="bg-[#181717] hover:bg-black text-white px-5 py-2 rounded-xs text-xs font-bold shadow-md inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all active:scale-95"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Deploying to GitHub...</span>
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 text-amber-300" />
                      <span>Launch to GitHub Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
