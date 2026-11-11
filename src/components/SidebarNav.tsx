import React from 'react';
import {
  Sparkles,
  BookOpen,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Download
} from 'lucide-react';
import { INSTITUTE_INFO } from '../data/itiData';

interface SidebarNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenProspectus: () => void;
  onOpenAdmission: () => void;
  fontSizeLevel: number;
  onFontSizeChange: (level: number) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeSection,
  onNavigate,
  onOpenProspectus,
  onOpenAdmission,
  fontSizeLevel,
  onFontSizeChange
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'admissions', label: 'Admissions 2025' },
    { id: 'trades', label: 'Trades (5 Courses)' },
    { id: 'notices', label: 'Notices & Circulars' },
    { id: 'facilities', label: 'Workshops & Campus' },
    { id: 'faculty', label: 'Staff & Instructors' },
    { id: 'about', label: 'About Institute' },
    { id: 'gallery', label: 'Campus Gallery' },
    { id: 'contact', label: 'Contact & Location' }
  ];

  return (
    <aside className="space-y-6">
      {/* Brand Header */}
      <div className="pb-5 border-b-2 border-[#111113]">
        <div className="ui-label text-[#111113]/60 mb-1.5 flex items-center justify-between">
          <span>Institute Portal</span>
          <span className="w-2 h-2 rounded-full bg-[#0F392B] animate-pulse" />
        </div>
        <h2
          onClick={() => onNavigate('home')}
          className="text-2xl font-black text-[#111113] tracking-tight cursor-pointer hover:text-[#0F392B] transition-colors"
        >
          ITI Sohra
        </h2>
        <p className="text-[11px] font-mono text-[#111113]/70 mt-1">
          Cherrapunji, Meghalaya
        </p>
      </div>

      {/* Main Navigation Links */}
      <nav aria-label="Portal Navigation">
        <ul className="space-y-1.5 list-none p-0 m-0">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#0F392B] text-white shadow-xs'
                      : 'text-[#111113] hover:bg-black/5 hover:translate-x-1'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#F8F7F4]" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Primary CTAs */}
      <div className="pt-4 border-t border-black/10 space-y-2">
        <button
          onClick={onOpenAdmission}
          className="w-full py-2.5 px-3 rounded-lg bg-[#0F392B] hover:bg-[#154a38] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Apply Online 2027-28 (idect.in)</span>
        </button>

        <button
          onClick={onOpenProspectus}
          className="w-full py-2 px-3 rounded-lg border border-[#111113]/30 hover:border-[#111113] hover:bg-black/5 text-[#111113] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#0F392B]" />
          <span>Download Prospectus</span>
        </button>
      </div>

      {/* Trainee Support & Accessibility */}
      <div className="p-3.5 rounded-xl border border-black/10 bg-black/[0.02] space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#111113]/70">
          <span>Text Scale:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onFontSizeChange(Math.max(-1, fontSizeLevel - 1))}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                fontSizeLevel === -1 ? 'bg-[#0F392B] text-white' : 'hover:bg-black/10'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => onFontSizeChange(0)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                fontSizeLevel === 0 ? 'bg-[#0F392B] text-white' : 'hover:bg-black/10'
              }`}
            >
              A
            </button>
            <button
              onClick={() => onFontSizeChange(Math.min(2, fontSizeLevel + 1))}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                fontSizeLevel > 0 ? 'bg-[#0F392B] text-white' : 'hover:bg-black/10'
              }`}
            >
              A+
            </button>
          </div>
        </div>

        <div className="text-[11px] space-y-1 text-[#111113]/80 pt-1 border-t border-black/5">
          <div className="flex items-start gap-1.5">
            <MapPin className="w-3 h-3 text-[#0F392B] shrink-0 mt-0.5" />
            <span className="font-mono text-[10px] leading-tight">
              Saitsohpen, Sohra - 793108
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-[#0F392B] shrink-0" />
            <a
              href={`mailto:${INSTITUTE_INFO.email}`}
              className="font-mono text-[10px] hover:underline truncate"
            >
              {INSTITUTE_INFO.email}
            </a>
          </div>
        </div>
      </div>

      {/* Regulatory Badge */}
      <div className="text-[10px] font-mono text-[#111113]/50 space-y-1 pt-2">
        <div>NCVT / DGT AFFILIATED</div>
        <div>DECT MEGHALAYA</div>
        <div>ADB HUMAN CAPITAL PROJECT</div>
      </div>
    </aside>
  );
};
