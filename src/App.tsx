/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TradeSection } from './components/TradeSection';
import { EligibilityCalculator } from './components/EligibilityCalculator';
import { AdmissionSection } from './components/AdmissionSection';
import { NoticeBoardSection } from './components/NoticeBoardSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { NoticeModal } from './components/NoticeModal';
import { TradeDetailModal } from './components/TradeDetailModal';
import { AdmissionApplicationModal } from './components/AdmissionApplicationModal';
import { ProspectusModal } from './components/ProspectusModal';
import { GitHubDeployModal } from './components/GitHubDeployModal';
import { Notice, Trade, FAQS, GalleryItem, GALLERY_ITEMS } from './data/itiData';
import { ChevronDown, HelpCircle, Download, ShieldCheck, CheckCircle2, Globe, Copy, ExternalLink, Rocket } from 'lucide-react';
import { downloadProjectBackup } from './utils/backupProject';
import { auth, loginWithGoogle, logoutUser } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  subscribeToCirculars,
  subscribeToGallery,
  saveCircular,
  removeCircular,
  savePhoto,
  removePhoto
} from './services/firestoreService';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [preSelectedTradeId, setPreSelectedTradeId] = useState<string | undefined>(undefined);
  const [prospectusModalOpen, setProspectusModalOpen] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDownloadingBackup, setIsDownloadingBackup] = useState(false);
  const [backupDownloadedFile, setBackupDownloadedFile] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [githubDeployOpen, setGithubDeployOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const liveUrl = "https://itisohra.github.io/";

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(liveUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (e) {
      console.warn('Could not copy link', e);
    }
  };

  const [notices, setNotices] = useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem('iti_sohra_circulars');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only keep real uploaded circulars, clear any sample generated ones
        return Array.isArray(parsed) ? parsed.filter((n: any) => n.isRealUpload) : [];
      }
    } catch (e) {
      console.warn('Storage read error', e);
    }
    return [];
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsubCirculars = subscribeToCirculars((remoteCirculars) => {
      if (remoteCirculars) {
        setNotices(remoteCirculars);
        try {
          localStorage.setItem('iti_sohra_circulars', JSON.stringify(remoteCirculars));
        } catch {}
      }
    });

    const unsubGallery = subscribeToGallery((remotePhotos) => {
      if (remotePhotos) {
        setPhotos(remotePhotos);
        try {
          localStorage.setItem('iti_sohra_gallery_photos', JSON.stringify(remotePhotos));
        } catch {}
      }
    });

    return () => {
      unsubCirculars();
      unsubGallery();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.warn('Google login cancelled or error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn('Logout error:', err);
    }
  };

  const handleAddNotice = async (newNotice: Notice) => {
    setNotices((prev) => [newNotice, ...prev]);
    try {
      localStorage.setItem('iti_sohra_circulars', JSON.stringify([newNotice, ...notices]));
    } catch {}

    try {
      await saveCircular(newNotice);
    } catch (err) {
      console.warn('Saved locally; could not sync to Firestore cloud', err);
    }
  };

  const handleDeleteNotice = async (noticeId: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== noticeId));
    try {
      localStorage.setItem('iti_sohra_circulars', JSON.stringify(notices.filter((n) => n.id !== noticeId)));
    } catch {}

    try {
      await removeCircular(noticeId);
    } catch (err) {
      console.warn('Deleted locally; could not remove from Firestore', err);
    }
  };

  const handleClearAllNotices = async () => {
    const toDelete = [...notices];
    setNotices([]);
    try {
      localStorage.setItem('iti_sohra_circulars', JSON.stringify([]));
    } catch {}

    for (const n of toDelete) {
      try {
        await removeCircular(n.id);
      } catch {}
    }
  };

  const [photos, setPhotos] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('iti_sohra_gallery_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        const realOnly = Array.isArray(parsed) ? parsed.filter((p: any) => p.isRealUpload) : [];
        try {
          localStorage.setItem('iti_sohra_gallery_photos', JSON.stringify(realOnly));
        } catch {}
        return realOnly;
      }
    } catch (e) {
      console.warn('Storage read error', e);
    }
    return [];
  });

  const handleAddPhoto = async (newPhoto: GalleryItem) => {
    setPhotos((prev) => [newPhoto, ...prev]);
    try {
      localStorage.setItem('iti_sohra_gallery_photos', JSON.stringify([newPhoto, ...photos]));
    } catch {}

    try {
      await savePhoto(newPhoto);
    } catch (err) {
      console.warn('Saved locally; could not sync to Firestore cloud', err);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    try {
      localStorage.setItem('iti_sohra_gallery_photos', JSON.stringify(photos.filter((p) => p.id !== photoId)));
    } catch {}

    try {
      await removePhoto(photoId);
    } catch (err) {
      console.warn('Deleted locally; could not remove from Firestore', err);
    }
  };

  const handleClearAllPhotos = async () => {
    const toDelete = [...photos];
    setPhotos([]);
    try {
      localStorage.setItem('iti_sohra_gallery_photos', JSON.stringify([]));
    } catch {}

    for (const p of toDelete) {
      try {
        await removePhoto(p.id);
      } catch {}
    }
  };

  const handleDownloadAppBackup = async () => {
    try {
      setIsDownloadingBackup(true);
      const name = await downloadProjectBackup();
      setBackupDownloadedFile(name);
    } catch (err) {
      console.error(err);
      alert('Could not download zip. Please check browser permissions.');
    } finally {
      setIsDownloadingBackup(false);
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyForTrade = (tradeId: string) => {
    setPreSelectedTradeId(tradeId);
    setAdmissionModalOpen(true);
  };

  const getFontSizeClass = () => {
    if (fontSizeLevel === -1) return 'text-[0.92rem]';
    if (fontSizeLevel === 1) return 'text-[1.06rem]';
    if (fontSizeLevel === 2) return 'text-[1.14rem]';
    return 'text-[1rem]';
  };

  return (
    <div className={`min-h-screen bg-white text-[#1A1A1A] font-sans ${getFontSizeClass()}`}>
      
      {/* Top Banner, Navigation & Marquee matching Variation 13 with custom colors */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenProspectus={() => setProspectusModalOpen(true)}
        onOpenAdmission={() => {
          setPreSelectedTradeId(undefined);
          setAdmissionModalOpen(true);
        }}
        onSelectNotice={(notice) => setSelectedNotice(notice)}
        fontSizeLevel={fontSizeLevel}
        onFontSizeChange={setFontSizeLevel}
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        notices={notices}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenGitHubDeploy={() => setGithubDeployOpen(true)}
      />

      {/* Floating alert when Edit Mode is active */}
      {isEditMode && (
        <div className="bg-amber-100 border-b-2 border-amber-400 px-4 py-2 text-center text-xs text-amber-950 font-bold sticky top-0 z-40 shadow-xs flex items-center justify-center gap-2">
          <span>✏️ Text Editing Mode is ACTIVE:</span>
          <span className="font-normal">Click any text on the page to type and edit it directly. Click "Exit Edit Mode" in the top bar when done.</span>
        </div>
      )}

      {/* Main Container matching Variation 13: max-width: 1200px; margin: 2rem auto; padding: 0 1rem; */}
      <div className="max-w-[1200px] mx-auto my-6 px-4 space-y-8">
        
        {/* Official Live Website Announcement Banner */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-600 rounded-lg p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-emerald-600 text-white rounded-full shrink-0 shadow-xs mt-0.5">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-emerald-950 text-base sm:text-lg">
                  🎉 Your Website is Live on GitHub Pages!
                </span>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  Published & 100% Free Forever
                </span>
              </div>
              <p className="text-xs text-emerald-900 mt-1 max-w-2xl leading-relaxed">
                Your portal has been officially deployed to your GitHub account (<strong>itisohra</strong>) and is active for the public with free SSL security.
              </p>
              
              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#333] font-bold">Official Public Website:</span>
                <a
                  href="https://itisohra.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-emerald-400 text-[#004a99] hover:underline font-mono font-bold px-2.5 py-1 rounded-sm text-[11px] sm:text-xs select-all break-all shadow-2xs"
                >
                  https://itisohra.github.io/
                </a>
                <span className="text-gray-500 text-[11px]">(Also mirrors at <a href="https://itisohra.github.io/ITI-Sohra/" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-800">/ITI-Sohra/</a>)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 self-stretch sm:self-auto justify-end">
            <a
              href="https://itisohra.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Live Website</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-400 font-bold text-xs px-3.5 py-2.5 rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Copy the public website link to share on WhatsApp or official notices"
            >
              {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-emerald-700" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <HeroSection
          onOpenAdmission={() => {
            setPreSelectedTradeId(undefined);
            setAdmissionModalOpen(true);
          }}
          onOpenProspectus={() => setProspectusModalOpen(true)}
          onNavigate={handleNavigate}
          isEditMode={isEditMode}
        />

        {/* Latest Notifications & Circulars Section */}
        <NoticeBoardSection
          notices={notices}
          onSelectNotice={(notice) => setSelectedNotice(notice)}
          onAddNotice={handleAddNotice}
          onDeleteNotice={handleDeleteNotice}
          onClearAllNotices={handleClearAllNotices}
          currentUser={currentUser}
          onLogin={handleLogin}
        />

        {/* Available Trades Section (Table view matching Variation 13) */}
        <TradeSection
          onSelectTrade={(trade) => setSelectedTrade(trade)}
          onApplyForTrade={handleApplyForTrade}
          isEditMode={isEditMode}
        />

        {/* Course Eligibility Finder */}
        <section>
          <EligibilityCalculator
            onSelectTrade={(trade) => setSelectedTrade(trade)}
            onApplyForTrade={handleApplyForTrade}
          />
        </section>

        {/* Admission Process Section matching Variation 13 5-step workflow */}
        <AdmissionSection
          onOpenAdmission={() => {
            setPreSelectedTradeId(undefined);
            setAdmissionModalOpen(true);
          }}
          onOpenProspectus={() => setProspectusModalOpen(true)}
        />

        {/* Workshops & Campus Facilities */}
        <FacilitiesSection />


        {/* About Institute Section */}
        <AboutSection
          onOpenProspectus={() => setProspectusModalOpen(true)}
          onOpenAdmission={() => {
            setPreSelectedTradeId(undefined);
            setAdmissionModalOpen(true);
          }}
        />

        {/* Photo Gallery Section */}
        <GallerySection
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
          onClearAllPhotos={handleClearAllPhotos}
          currentUser={currentUser}
          onLogin={handleLogin}
        />

        {/* FAQ Accordion Section */}
        <section className="border border-[#ddd] p-6 bg-white">
          <h2 className="gov-section-title flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#004a99]" />
            <span>Frequently Asked Questions (Admissions & Training)</span>
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#ddd] bg-white transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-3.5 flex items-center justify-between gap-3 hover:bg-[#f9fafb] cursor-pointer"
                  >
                    <span className="font-bold text-sm text-[#1A1A1A]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#004a99] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-1 text-xs sm:text-sm text-[#444] border-t border-[#eee] leading-relaxed bg-[#fbfcfd]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact & Map Section */}
        <ContactSection />
      </div>

      {/* Footer matching Variation 13: background: #333; color: white; text-align: center; padding: 2rem; margin-top: 3rem; */}
      <Footer
        onNavigate={handleNavigate}
        onOpenProspectus={() => setProspectusModalOpen(true)}
        onOpenAdmission={() => {
          setPreSelectedTradeId(undefined);
          setAdmissionModalOpen(true);
        }}
      />

      {/* Interactive Modals */}
      <NoticeModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

      <TradeDetailModal
        trade={selectedTrade}
        onClose={() => setSelectedTrade(null)}
        onApplyForTrade={handleApplyForTrade}
      />

      <AdmissionApplicationModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        preSelectedTradeId={preSelectedTradeId}
      />

      <ProspectusModal
        isOpen={prospectusModalOpen}
        onClose={() => setProspectusModalOpen(false)}
        onApply={() => {
          setPreSelectedTradeId(undefined);
          setAdmissionModalOpen(true);
        }}
      />

      <GitHubDeployModal
        isOpen={githubDeployOpen}
        onClose={() => setGithubDeployOpen(false)}
      />
    </div>
  );
}
