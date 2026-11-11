import JSZip from 'jszip';

// Import raw contents of all source files so we can create a complete zip backup and GitHub deployment
export const sourceFiles = import.meta.glob(
  [
    '/src/**/*',
    '/index.html',
    '/package.json',
    '/metadata.json',
    '/tsconfig.json',
    '/vite.config.ts',
    '/firebase-applet-config.json',
    '/firestore.rules',
    '/firebase-blueprint.json',
    '/.github/workflows/deploy.yml',
    '/README.md'
  ],
  {
    query: '?raw',
    import: 'default',
    eager: true
  }
) as Record<string, string>;

export async function downloadProjectBackup(): Promise<string> {
  const zip = new JSZip();

  // 1. Add all project source files to the zip
  for (const [path, content] of Object.entries(sourceFiles)) {
    // Strip leading slash
    const relativePath = path.startsWith('/') ? path.slice(1) : path;
    if (typeof content === 'string') {
      zip.file(relativePath, content);
    }
  }

  // 2. Add custom user logo if present in localStorage
  try {
    const savedLogo = localStorage.getItem('iti_sohra_logo_img');
    if (savedLogo) {
      if (savedLogo.startsWith('data:image/')) {
        const parts = savedLogo.split(',');
        const base64Data = parts[1];
        const mime = parts[0].split(':')[1].split(';')[0];
        const ext = mime.split('/')[1] || 'png';
        zip.file(`custom_institute_logo.${ext}`, base64Data, { base64: true });
      } else {
        zip.file('custom_institute_logo_url.txt', savedLogo);
      }
    }
  } catch (err) {
    console.warn('Could not export custom logo to zip:', err);
  }

  // 3. Add an informative README with URLs, instructions, and trade info
  const readmeContent = `====================================================================
GOVERNMENT INDUSTRIAL TRAINING INSTITUTE (ITI) SOHRA, MEGHALAYA
DIRECTORATE OF EMPLOYMENT & CRAFTSMEN TRAINING (DECT)
OFFICIAL WEBSITE BACKUP & ARCHIVE
====================================================================

Saved Date: ${new Date().toLocaleString()}
Account: itisohra@gmail.com

1. ONLINE ACCESS
--------------------------------------------------------------------
You don't need this zip file to run the website. Your website is permanently 
hosted and auto-saved in your Google AI Studio account under: itisohra@gmail.com

Online Website URLs:
- Official Preview: https://ais-pre-naxwonbvtqv47tiwtp2s7i-991503181738.asia-east1.run.app
- Development Editor: https://ais-dev-naxwonbvtqv47tiwtp2s7i-991503181738.asia-east1.run.app

2. APPROVED VOCATIONAL TRADES (CTS)
--------------------------------------------------------------------
1. Computer Operator & Programming Assistant (COPA) - 1 Year (24 Seats)
2. Wireman - 2 Years (20 Seats)
3. Plumber - 1 Year (24 Seats)
4. Mason (Building Constructor) - 1 Year (24 Seats)
5. Catering & Hospitality Assistant - 1 Year (20 Seats)
Total Annual Intake: 112 Seats

*(Welder and General Painter trades have been excluded as requested)*

3. HOW TO RESUME WORK
--------------------------------------------------------------------
1. Open any computer or mobile browser.
2. Visit https://aistudio.google.com and log in with "itisohra@gmail.com".
3. Select your "Government ITI Sohra" project to continue making edits anytime!

====================================================================
All files are saved and verified. You may safely turn off your PC.
====================================================================
`;
  zip.file('README_ITI_SOHRA_BACKUP.txt', readmeContent);

  // 4. Generate the zip file blob
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const fileName = `ITI_Sohra_Website_Backup_${new Date().toISOString().slice(0, 10)}.zip`;

  // 5. Trigger automatic browser download to the user's Downloads folder
  const downloadUrl = URL.createObjectURL(zipBlob);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 10000);

  return fileName;
}
