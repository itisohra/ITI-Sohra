import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Wrench,
  Award,
  Building,
  GraduationCap,
  Users
} from 'lucide-react';
import { INSTITUTE_INFO, TRADES_LIST } from '../data/itiData';

interface HeroSectionProps {
  onOpenAdmission: () => void;
  onOpenProspectus: () => void;
  onNavigate: (sectionId: string) => void;
  isEditMode?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAdmission,
  onOpenProspectus,
  onNavigate,
  isEditMode = false
}) => {
  return (
    <section id="welcome" className="mb-8">
      {/* Section Title matching Variation 13: border-bottom: 2px solid #004a99; color: #004a99; font-size: 1.5rem; */}
      <h2
        contentEditable={isEditMode}
        suppressContentEditableWarning
        className={`gov-section-title ${isEditMode ? 'outline-dashed outline-2 outline-blue-600 bg-amber-50/60 px-2' : ''}`}
      >
        Welcome to ITI Sohra
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
        <div className="lg:col-span-8 space-y-3">
          <p
            contentEditable={isEditMode}
            suppressContentEditableWarning
            className={`text-[#1A1A1A] text-sm sm:text-base leading-relaxed m-0 ${
              isEditMode ? 'outline-dashed outline-1 outline-blue-600 bg-amber-50/40 p-1 rounded-xs' : ''
            }`}
          >
            Official web portal of <strong>Government Industrial Training Institute (ITI) Sohra</strong>, East Khasi Hills, Meghalaya. Explore vocational trades, admissions, syllabus, notices, and campus facilities under the Directorate of Employment & Craftsmen Training (DECT), Government of Meghalaya.
          </p>

          <p
            contentEditable={isEditMode}
            suppressContentEditableWarning
            className={`text-[#444] text-xs sm:text-sm leading-relaxed m-0 ${
              isEditMode ? 'outline-dashed outline-1 outline-blue-600 bg-amber-50/40 p-1 rounded-xs' : ''
            }`}
          >
            Established in 2011 and operating from a dedicated modern campus at Saitsohpen built under the Asian Development Bank (ADB) assisted project <em>Supporting Human Capital Development in Meghalaya</em> and <em>Enhancing Skill Development Infrastructure in NE States (ESDI)</em> scheme. All trades adhere strictly to the National Skills Qualifications Framework (NSQF) and NCVT / DGT guidelines.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={onOpenAdmission}
              className="bg-[#004a99] hover:bg-[#003875] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xs shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span
                contentEditable={isEditMode}
                suppressContentEditableWarning
                className={isEditMode ? 'outline-dashed outline-1 outline-white px-1' : ''}
              >
                Admission for 2027-28 via idect.in
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* CSS Selector 5: Button with span child */}
            <button
              onClick={() => onNavigate('trades')}
              className="bg-white border border-[#004a99] text-[#004a99] hover:bg-[#EAF0F6] font-semibold text-xs sm:text-sm px-4 py-2 rounded-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              <span
                contentEditable={isEditMode}
                suppressContentEditableWarning
                className={isEditMode ? 'outline-dashed outline-1 outline-[#004a99] px-1' : ''}
              >
                View 5 Trades Offered
              </span>
            </button>

            <button
              onClick={onOpenProspectus}
              className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#1A1A1A] border border-[#ccc] font-medium text-xs sm:text-sm px-4 py-2 rounded-xs transition-colors inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-[#004a99]" />
              <span>Download Prospectus</span>
            </button>
          </div>
        </div>

        {/* Highlight Card */}
        <div className="lg:col-span-4 bg-[#EAF0F6] border border-[#bcd0e4] p-4 rounded-xs space-y-2">
          <div className="text-xs font-bold text-[#004a99] uppercase tracking-wide">
            Institutional Highlights
          </div>
          <div className="text-xs text-[#1A1A1A] space-y-1.5">
            <div className="flex justify-between py-1 border-b border-[#bcd0e4]/60">
              <span className="text-[#555]">Affiliation:</span>
              <span className="font-semibold text-[#004a99]">NCVT / DGT, Govt. of India</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#bcd0e4]/60">
              <span className="text-[#555]">Active Trades:</span>
              <span className="font-semibold">5 Vocational Courses</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#bcd0e4]/60">
              <span className="text-[#555]">Total Annual Intake:</span>
              <span className="font-semibold">{TRADES_LIST.reduce((acc, t) => acc + t.totalSeats, 0)} Trainee Seats</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#bcd0e4]/60">
              <span className="text-[#555]">Tuition Policy:</span>
              <span className="font-semibold text-emerald-800">100% Free for Meghalaya ST</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#555]">Campus Location:</span>
              <span className="font-semibold">Saitsohpen, Sohra (793108)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="border border-[#ddd] p-3 text-center bg-white shadow-2xs">
          <div className="text-2xl font-bold text-[#004a99]">{TRADES_LIST.length}</div>
          <div className="text-xs font-semibold text-[#1A1A1A]">CTS Trades</div>
          <div className="text-[11px] text-[#666]">Engineering & Non-Engg</div>
        </div>
        <div className="border border-[#ddd] p-3 text-center bg-white shadow-2xs">
          <div className="text-2xl font-bold text-[#004a99]">{TRADES_LIST.reduce((acc, t) => acc + t.totalSeats, 0)}</div>
          <div className="text-xs font-semibold text-[#1A1A1A]">Annual Seats</div>
          <div className="text-[11px] text-[#666]">Subsidized / ST Free</div>
        </div>
        <div className="border border-[#ddd] p-3 text-center bg-white shadow-2xs">
          <div className="text-2xl font-bold text-[#004a99]">100%</div>
          <div className="text-xs font-semibold text-[#1A1A1A]">Workshop Practical</div>
          <div className="text-[11px] text-[#666]">Hands-on Industry Specs</div>
        </div>
      </div>
    </section>
  );
};
