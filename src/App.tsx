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
  const liveUrl = "https://ais-pre-naxwonbvtqv47tiwtp2s7i-991503181738.asia-east1.run.app";

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
        
        {/* Official Live Website Activation Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border-2 border-[#004a99] rounded-lg p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-[#004a99] text-white rounded-full shrink-0 shadow-xs mt-0.5">
              <Globe className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-[#003875] text-base sm:text-lg">
                  How to Make Your Website Public for Everyone
                </span>
                <span className="bg-[#004a99] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  1-Click Activation
                </span>
              </div>
              <p className="text-xs text-[#333] mt-1.5 max-w-2xl leading-relaxed">
                Google AI Studio keeps websites private to you until you activate public sharing. To make your website open to all students, applicants, and the public:
              </p>
              
              <ol className="list-decimal ml-4 mt-2 text-xs text-[#1A1A1A] space-y-1 font-medium">
                <li>Look at the <strong>very top-right corner of your screen</strong> in AI Studio (next to your Google profile picture).</li>
                <li>Click the <strong>"Share"</strong> button.</li>
                <li>Select <strong>"Anyone with the link can view"</strong> and copy your public link.</li>
              </ol>

              <div className="mt-2.5 flex items-center gap-2 text-xs text-[#004a99] font-semibold bg-white/80 p-2 rounded-xs border border-[#bcd0e4]">
                <span>✓ Once you click "Share", your website and cloud database will immediately open for everyone across all devices!</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0 self-stretch sm:self-auto justify-end">
            <button
              type="button"
              onClick={() => setGithubDeployOpen(true)}
              className="w-full sm:w-auto bg-[#181717] hover:bg-black active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ring-1 ring-white/20"
            >
              <Rocket className="w-4 h-4 text-amber-300" />
              <span>🚀 Launch to GitHub Pages</span>
            </button>

            <button
              type="button"
              onClick={() => {
                alert('To activate your live link for everyone in AI Studio:\n\n1. Look at the top-right corner of AI Studio (near your Google account).\n2. Click the "Share" button.\n3. Turn on sharing for "Anyone with the link".\n\nGoogle will activate your public URL immediately!');
              }}
              className="w-full sm:w-auto bg-[#004a99] hover:bg-[#003875] active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Click "Share" at Top-Right ↗</span>
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
