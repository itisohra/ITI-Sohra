import React from 'react';
import { ExternalLink, ChevronUp } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/itiData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenProspectus: () => void;
  onOpenAdmission: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenProspectus,
  onOpenAdmission
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#333] text-white text-center py-8 px-4 mt-12 text-xs sm:text-sm">
      <div className="max-w-[1200px] mx-auto space-y-4">
        
        {/* Quick Portal Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#ddd] pb-4 border-b border-[#555]">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <button onClick={() => onNavigate('notices')} className="hover:underline">Notices</button>
          <button onClick={() => onNavigate('trades')} className="hover:underline">Available Trades</button>
          <button onClick={() => onNavigate('admissions')} className="hover:underline">Admission Process</button>
          <button onClick={() => onNavigate('facilities')} className="hover:underline">Workshops</button>
          <button onClick={() => onNavigate('contact')} className="hover:underline">Contact Us</button>
          <button onClick={onOpenProspectus} className="hover:underline text-amber-300 font-semibold">Prospectus PDF</button>
          <button onClick={onOpenAdmission} className="hover:underline text-emerald-300 font-semibold">Apply Online</button>
        </div>

        {/* National & State Portal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#bbb]">
          <a href={INSTITUTE_INFO.dectPortalUrl} target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1">
            <span>DECT Meghalaya</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <span>•</span>
          <a href={INSTITUTE_INFO.ncvtMisUrl} target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1">
            <span>NCVT MIS Portal</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <span>•</span>
          <a href={INSTITUTE_INFO.apprenticeshipUrl} target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1">
            <span>NAPS Apprenticeship</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <span>•</span>
          <a href="https://dgt.gov.in" target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-1">
            <span>DGT (Govt. of India)</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* Official Footer Text matching Variation 13 */}
        <div className="pt-2 text-xs text-[#eee] space-y-1">
          <p className="m-0 font-medium">
            &copy; 2026 Government ITI Sohra | Directorate of Employment & Craftsmen Training, Meghalaya
          </p>
          <p className="m-0 text-[#aaa] text-xs">
            Saitsohpen (Near NIT Meghalaya), Sohra, East Khasi Hills, PIN: 793108 | itisohra@gmail.com
          </p>
        </div>

        <div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-[11px] text-[#ccc] hover:text-white border border-[#666] px-2 py-0.5 rounded-xs hover:bg-[#444] transition-colors"
          >
            <ChevronUp className="w-3 h-3" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
