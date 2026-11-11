import React, { useState, useRef } from 'react';
import {
  Menu,
  X,
  Bell,
  Mail,
  MapPin,
  BookOpen,
  Volume2,
  VolumeX,
  ExternalLink,
  Camera,
  Upload,
  RotateCcw,
  Download,
  CheckCircle2,
  HardDrive,
  ShieldCheck,
  Globe,
  Copy,
  Rocket
} from 'lucide-react';
import { INSTITUTE_INFO, NOTICES_LIST, Notice } from '../data/itiData';
import { downloadProjectBackup } from '../utils/backupProject';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenProspectus: () => void;
  onOpenAdmission: () => void;
  onSelectNotice: (notice: Notice) => void;
  fontSizeLevel: number;
  onFontSizeChange: (level: number) => void;
  isEditMode?: boolean;
  onToggleEditMode?: () => void;
  notices?: Notice[];
  currentUser?: { email?: string | null; displayName?: string | null } | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onOpenGitHubDeploy?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenProspectus,
  onOpenAdmission,
  onSelectNotice,
  fontSizeLevel,
  onFontSizeChange,
  isEditMode = false,
  onToggleEditMode,
  notices = [],
  currentUser = null,
  onLogin,
  onLogout,
  onOpenGitHubDeploy
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customLogo, setCustomLogo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('iti_sohra_logo_img');
    } catch {
      return null;
    }
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, SVG, WebP, etc.).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomLogo(result);
        try {
          localStorage.setItem('iti_sohra_logo_img', result);
        } catch (err) {
          console.warn('Storage error:', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomLogo(null);
    try {
      localStorage.removeItem('iti_sohra_logo_img');
    } catch (err) {
      console.warn('Storage error:', err);
    }
  };

  const [isDownloadingBackup, setIsDownloadingBackup] = useState(false);
  const [backupSuccessFileName, setBackupSuccessFileName] = useState<string | null>(null);

  const handleDownloadBackup = async () => {
    try {
      setIsDownloadingBackup(true);
      const fileName = await downloadProjectBackup();
      setBackupSuccessFileName(fileName);
    } catch (err) {
      console.error('Backup download error:', err);
      alert('Could not create zip. Please check browser permissions.');
    } finally {
      setIsDownloadingBackup(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'notices', label: 'Notices' },
    { id: 'trades', label: 'Trades Offered' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="w-full">
      {/* Hidden File Input for Logo Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleLogoUpload}
      />

      {/* 1. Official Header Box matching CSS 4: background-color: #f28e1a; */}
      <div
        className="border-b-[3px] border-[#004a99] px-4 sm:px-8 py-5"
        style={{ backgroundColor: '#f28e1a' }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Institute Title */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-4 cursor-pointer group"
          >
            {/* Crest container matching Variation 13 (60px x 60px) with logo image upload */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                title="Click to upload custom ITI Sohra logo"
                className="relative w-[60px] h-[60px] bg-white text-white flex flex-col items-center justify-center rounded-xs shadow-xs shrink-0 border border-[#003875] overflow-hidden group/logo cursor-pointer hover:border-[#004a99]"
              >
                {customLogo ? (
                  <img
                    src={customLogo}
                    alt="Government ITI Sohra Logo"
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <div className="w-full h-full bg-[#004a99] flex flex-col items-center justify-center p-1 text-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-amber-300 mb-0.5"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    <span className="font-black text-[11px] tracking-wider leading-none">ITI</span>
                    <span className="text-[8px] uppercase font-bold tracking-tight mt-0.5">SOHRA</span>
                  </div>
                )}

                {/* Hover overlay inviting upload */}
                <div className="absolute inset-0 bg-[#003875]/90 text-white flex flex-col items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity p-0.5 text-center">
                  <Camera className="w-4 h-4 mb-0.5 text-amber-300" />
                  <span className="text-[8px] font-bold uppercase leading-none tracking-tight">
                    {customLogo ? 'Change' : 'Upload'}
                  </span>
                </div>
              </div>

              {/* Upload / Reset control buttons */}
              <div className="flex items-center gap-1.5 text-[9px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="text-white drop-shadow-xs hover:underline flex items-center gap-0.5 font-bold"
                  title="Upload ITI Logo image file"
                >
                  <Upload className="w-2.5 h-2.5" />
                  <span>{customLogo ? 'Change' : 'Upload'}</span>
                </button>
                {customLogo && (
                  <>
                    <span className="text-white/60">•</span>
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="text-white hover:text-red-200 hover:underline flex items-center gap-0.5 font-semibold"
                      title="Reset to default emblem"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Reset</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div>
              <h1
                className="m-0 text-xl sm:text-2xl lg:text-[1.8rem] font-bold leading-tight"
                style={{ color: '#081d58' }}
              >
                Government Industrial Training Institute (ITI) Sohra
              </h1>
              {/* CSS Selector 3: Subtitle paragraph with optional contentEditable */}
              <p
                contentEditable={isEditMode}
                suppressContentEditableWarning
                className={`m-0 text-xs sm:text-sm text-[#1A1A1A] font-medium mt-0.5 ${
                  isEditMode ? 'bg-white/80 outline-dashed outline-2 outline-blue-700 px-1.5 py-0.5 rounded-xs' : ''
                }`}
              >
                Directorate of Employment & Craftsmen Training, Government of Meghalaya
              </p>
              <p className="m-0 text-[11px] text-[#003875] font-semibold hidden sm:block">
                Affiliated to NCVT / DGT, Ministry of Skill Development, Govt. of India • Estd. 2011
              </p>
            </div>
          </div>

          {/* Quick Access CTAs & Text Scaler & Edit Text Toggle & Save to PC */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
            {/* 1-Click Launch to GitHub Button */}
            {onOpenGitHubDeploy && (
              <button
                type="button"
                onClick={onOpenGitHubDeploy}
                className="bg-[#181717] hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer ring-1 ring-white/20"
                title="Launch website directly to your GitHub ID for free hosting on GitHub Pages"
              >
                <Rocket className="w-3.5 h-3.5 text-amber-300" />
                <span>🚀 Launch to GitHub</span>
              </button>
            )}

            {/* Official Live Website Link */}
            <a
              href="https://itisohra.github.io/ITI-Sohra/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#004a99] hover:bg-[#003875] text-white text-xs font-bold px-3 py-1.5 rounded-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              title="Open your official live website on GitHub Pages"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>Visit Live Website ↗</span>
            </a>

            {/* 1-Click Save to PC Button */}
            <button
              type="button"
              onClick={handleDownloadBackup}
              disabled={isDownloadingBackup}
              className="bg-[#007a4d] hover:bg-[#00603c] text-white text-xs font-bold px-3 py-1.5 rounded-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              title="Download full project backup ZIP to your PC so you can safely shut down"
            >
              <Download className={`w-3.5 h-3.5 ${isDownloadingBackup ? 'animate-spin' : ''}`} />
              <span>{isDownloadingBackup ? 'Saving ZIP...' : 'Save to PC (.ZIP)'}</span>
            </button>

            {/* Edit Text Mode Toggle */}
            {onToggleEditMode && (
              <button
                type="button"
                onClick={onToggleEditMode}
                className={`text-xs font-bold px-2.5 py-1.5 rounded-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                  isEditMode
                    ? 'bg-amber-300 text-slate-900 border-2 border-amber-600 ring-2 ring-amber-400 font-extrabold'
                    : 'bg-white hover:bg-slate-100 text-[#1A1A1A] border border-[#ccc]'
                }`}
                title="Click to toggle in-place text editing on headings, paragraphs, and buttons"
              >
                <span className="text-xs">✏️</span>
                <span>{isEditMode ? 'Exit Edit Mode' : 'Edit Text'}</span>
              </button>
            )}

            {/* Text Zoom */}
            <div className="hidden sm:flex items-center gap-1 bg-white border border-[#ccc] px-2 py-1 text-xs text-[#555]">
              <span className="text-[10px] font-semibold">Text:</span>
              <button
                onClick={() => onFontSizeChange(Math.max(-1, fontSizeLevel - 1))}
                className={`px-1 font-bold ${fontSizeLevel === -1 ? 'text-[#004a99]' : 'hover:text-black'}`}
              >
                A-
              </button>
              <button
                onClick={() => onFontSizeChange(0)}
                className={`px-1 font-bold ${fontSizeLevel === 0 ? 'text-[#004a99]' : 'hover:text-black'}`}
              >
                A
              </button>
              <button
                onClick={() => onFontSizeChange(Math.min(2, fontSizeLevel + 1))}
                className={`px-1 font-bold ${fontSizeLevel > 0 ? 'text-[#004a99]' : 'hover:text-black'}`}
              >
                A+
              </button>
            </div>

            <button
              onClick={onOpenProspectus}
              className="bg-white border border-[#004a99] text-[#004a99] hover:bg-[#EAF0F6] text-xs font-semibold px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Prospectus</span>
            </button>

            {/* Office Admin Login / Authenticated Status */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs px-2.5 py-1.5 rounded-xs font-semibold shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline text-[11px]">Admin:</span>
                <span className="font-bold text-[11px] max-w-[120px] truncate" title={currentUser.email || ''}>
                  {currentUser.email?.split('@')[0]}
                </span>
                {onLogout && (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="text-red-700 hover:text-red-900 hover:underline text-[10px] font-bold ml-1 pl-1 border-l border-emerald-300 cursor-pointer"
                    title="Sign out of Office Admin"
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : (
              onLogin && (
                <button
                  type="button"
                  onClick={onLogin}
                  className="bg-white hover:bg-slate-50 border border-[#004a99] text-[#004a99] text-xs font-bold px-2.5 py-1.5 rounded-xs transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  title="Sign in with office Google account (itisohra@gmail.com) to publish circulars and photos live to all visitors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#004a99]" />
                  <span>Office Login</span>
                </button>
              )
            )}
          </div>

        </div>
      </div>

      {/* 2. Navigation Bar matching CSS 2: background-color: #00995f; */}
      <nav
        className="text-white px-4 sm:px-8 py-2 text-[0.9rem] shadow-xs"
        style={{ backgroundColor: '#00995f' }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center flex-wrap gap-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-white mr-6 text-left py-0.5 font-medium transition-all hover:underline ${
                    isActive ? 'font-bold underline decoration-2 underline-offset-4' : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto text-xs opacity-90">
            <span className="hidden lg:inline text-xs">
              Saitsohpen (Near NIT), Sohra - 793108
            </span>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center gap-1.5 text-white p-1"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="font-semibold text-xs">Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#003875] text-white px-4 py-3 space-y-1 border-t border-[#004a99]/40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2 px-2 text-xs font-semibold rounded-xs ${
                activeSection === item.id ? 'bg-[#004a99] font-bold' : 'hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Save to PC button */}
          <div className="pt-2 border-t border-white/20 mt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownloadBackup();
              }}
              disabled={isDownloadingBackup}
              className="w-full text-left py-2.5 px-3 text-xs font-bold rounded-xs bg-[#00995f] hover:bg-[#007a4d] text-white flex items-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloadingBackup ? 'Packaging...' : 'Save to PC (.ZIP Backup)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Live Notification Ticker Strip */}
      <div className="bg-[#f4f7fa] border-b border-[#ccc] px-4 sm:px-8 py-1.5 text-xs flex items-center gap-3 overflow-hidden text-[#1A1A1A]">
        <div className="flex items-center gap-1 font-bold text-[#004a99] shrink-0 text-[11px] uppercase tracking-wide">
          <Bell className="w-3.5 h-3.5 text-[#004a99]" />
          <span>Announcements:</span>
        </div>

        <div className="relative overflow-hidden flex-1 text-xs whitespace-nowrap">
          <div
            className={`inline-flex items-center gap-8 ${
              tickerPaused ? '' : 'animate-marquee'
            }`}
            onMouseEnter={() => setTickerPaused(true)}
            onMouseLeave={() => setTickerPaused(false)}
          >
            {notices && notices.length > 0 ? (
              notices.map((notice) => (
                <button
                  key={notice.id}
                  onClick={() => onSelectNotice(notice)}
                  className="hover:underline flex items-center gap-2 cursor-pointer text-[#1A1A1A] text-xs"
                >
                  <span className="bg-[#004a99] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-xs">
                    {notice.category}
                  </span>
                  <span className="font-semibold">{notice.title}</span>
                  <span className="text-[#666] text-[11px]">({notice.date})</span>
                  <span className="text-[#ccc]">•</span>
                </button>
              ))
            ) : (
              <span className="text-xs text-[#555] italic">
                Official circulars, notifications, and examination schedules will scroll here once published.
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setTickerPaused(!tickerPaused)}
          aria-label={tickerPaused ? 'Play marquee' : 'Pause marquee'}
          className="text-[#666] hover:text-[#1A1A1A] shrink-0 p-0.5"
        >
          {tickerPaused ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 4. Backup Success & Safe to Shut Down Modal */}
      {backupSuccessFileName && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border-2 border-emerald-600 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-emerald-700 text-white p-5 flex items-start gap-4">
              <div className="p-2 bg-emerald-800 rounded-full shrink-0">
                <ShieldCheck className="w-8 h-8 text-emerald-200" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold leading-tight">
                  All Files Saved! You Can Safely Shut Down Your PC
                </h3>
                <p className="text-emerald-100 text-xs mt-1">
                  Your complete website backup has been created and downloaded.
                </p>
              </div>
              <button
                onClick={() => setBackupSuccessFileName(null)}
                className="text-emerald-200 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-[#1A1A1A] text-sm">
              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3.5 flex items-center gap-3">
                <HardDrive className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <div className="font-bold text-emerald-900 text-xs uppercase tracking-wider">
                    Downloaded File on Your Computer:
                  </div>
                  <div className="font-mono text-xs text-emerald-800 font-semibold break-all">
                    {backupSuccessFileName}
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    Location: Your computer's <strong>Downloads</strong> folder
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Auto-saved in Cloud:</strong> Every change is permanently saved under your Google account <strong>itisohra@gmail.com</strong>.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Always Live Online:</strong> Your portal remains live on the web at any time.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Safe to Turn Off:</strong> You can power down or turn off your computer now without losing any progress.
                  </span>
                </div>
              </div>

              {/* Instructions when returning */}
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 text-xs text-slate-700">
                <strong>When you turn your PC back on:</strong>
                <ol className="list-decimal ml-4 mt-1 space-y-0.5">
                  <li>Go to <strong>aistudio.google.com</strong> and log in with your email.</li>
                  <li>Click on <strong>Government ITI Sohra</strong> to continue anytime!</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBackupSuccessFileName(null)}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-md text-xs text-center cursor-pointer shadow-xs transition-colors"
                >
                  ✓ Got It — Ready to Shut Down PC
                </button>
                <button
                  type="button"
                  onClick={handleDownloadBackup}
                  disabled={isDownloadingBackup}
                  className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 px-3 rounded-md text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Again</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
