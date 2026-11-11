import React from 'react';
import {
  X,
  BookOpen,
  Download,
  Printer,
  CheckCircle,
  Award,
  Shield,
  MapPin,
  Mail,
  Phone,
  FileCheck
} from 'lucide-react';
import { INSTITUTE_INFO, TRADES_LIST, FEE_STRUCTURE } from '../data/itiData';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const ProspectusModal: React.FC<ProspectusModalProps> = ({
  isOpen,
  onClose,
  onApply
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white border border-black/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-[#004a99] text-white p-5 flex items-center justify-between border-b-2 border-[#003875]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 flex items-center justify-center text-white rounded-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase">
                Official Information Brochure
              </span>
              <h3 className="text-base sm:text-lg font-bold mt-0.5">
                Govt. ITI Sohra — Prospectus 2027-2028
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close prospectus"
            className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prospectus Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-800 text-sm leading-relaxed">
          {/* Cover Header */}
          <div className="text-center border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 mb-2">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              Directorate of Employment & Craftsmen Training, Meghalaya
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
              GOVERNMENT INDUSTRIAL TRAINING INSTITUTE SOHRA
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Affiliated to NCVT / DGT, Ministry of Skill Development & Entrepreneurship, Govt. of India
            </p>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Saitsohpen, Sohra (Cherrapunji), East Khasi Hills District, Meghalaya - 793108
            </p>
          </div>

          {/* Section 1: Introduction */}
          <div>
            <h3 className="text-base font-bold text-[#004a99] border-l-4 border-[#004a99] pl-3 mb-2">
              1. Genesis & Institutional Objectives
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Government Industrial Training Institute (ITI) Sohra was established in 2011 to cater to the growing technical and vocational aspirations of youths across the Khasi Hills. In January 2021, a premier modern institutional campus was dedicated to the public at Saitsohpen, built under the Asian Development Bank (ADB) assisted project <em>Supporting Human Capital Development in Meghalaya</em> alongside the <em>Enhancing Skill Development Infrastructure in NE States (ESDI)</em> initiative.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              The primary mission is to ensure structured vocational education conforming to the national Craftsmen Training Scheme (CTS), equipping trainees with practical skills for industrial recruitment, self-employment, and national apprenticeships.
            </p>
          </div>

          {/* Section 2: Trades Offered */}
          <div>
            <h3 className="text-base font-bold text-[#004a99] border-l-4 border-[#004a99] pl-3 mb-3">
              2. Vocational Trades, Duration & Intake Matrix
            </h3>
            <div className="overflow-x-auto border border-[#ccc]">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-[#f4f4f4] text-[#1A1A1A] font-semibold">
                  <tr>
                    <th className="p-2.5 border border-[#ccc]">Trade Name</th>
                    <th className="p-2.5 border border-[#ccc]">Category</th>
                    <th className="p-2.5 border border-[#ccc]">Duration</th>
                    <th className="p-2.5 border border-[#ccc]">Min. Qualification</th>
                    <th className="p-2.5 border border-[#ccc]">Seats</th>
                    <th className="p-2.5 border border-[#ccc]">NSQF</th>
                  </tr>
                </thead>
                <tbody className="text-[#1A1A1A]">
                  {TRADES_LIST.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="p-2.5 border border-[#ccc] font-bold text-[#004a99]">{t.name}</td>
                      <td className="p-2.5 border border-[#ccc]">{t.category}</td>
                      <td className="p-2.5 border border-[#ccc] font-medium">{t.duration}</td>
                      <td className="p-2.5 border border-[#ccc]">{t.entryQualification.includes('10th') ? '10th SSLC Pass' : '8th Class Pass'}</td>
                      <td className="p-2.5 border border-[#ccc] font-bold text-[#004a99]">{t.totalSeats}</td>
                      <td className="p-2.5 border border-[#ccc]">Level {t.nsqfLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Fees */}
          <div>
            <h3 className="text-base font-bold text-[#004a99] border-l-4 border-[#004a99] pl-3 mb-3">
              3. Government Fee Structure & Financial Concessions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {FEE_STRUCTURE.map((f, i) => (
                <div key={i} className="p-3 rounded-xs border border-[#ddd] bg-[#f9fafb]">
                  <div className="font-semibold text-[#1A1A1A]">{f.item}</div>
                  <div className="text-[#004a99] font-bold mt-0.5">{f.amount}</div>
                  <div className="text-[#666] text-[11px] mt-0.5">{f.remark}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#666] mt-2 italic">
              * Note: Scheduled Tribe (ST) and Scheduled Caste (SC) candidates belonging to Meghalaya are eligible for state vocational training stipends and welfare concessions.
            </p>
          </div>

          {/* Section 4: Rules & Discipline */}
          <div>
            <h3 className="text-base font-bold text-[#004a99] border-l-4 border-[#004a99] pl-3 mb-2">
              4. Code of Discipline & Trainee Norms
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc pl-5">
              <li><strong>Attendance:</strong> Minimum 80% attendance in both theory and practical classes is compulsory to be eligible for the All India Trade Test (AITT).</li>
              <li><strong>Workshop Safety:</strong> Trainees must wear institute-prescribed uniforms and industrial safety shoes inside all technical workshop premises.</li>
              <li><strong>Prohibited Substances:</strong> Smoking, tobacco use, alcohol, and intoxicating substances are strictly prohibited inside the institute boundary. Zero tolerance policy on ragging.</li>
              <li><strong>Assessment:</strong> Trainees undergo regular unit tests, sessional assessments, and semester work log verification.</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="bg-[#EAF0F6] p-4 rounded-xs border border-[#bcd0e4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-bold text-[#004a99]">Have questions about admissions?</p>
              <p className="text-[#555]">Contact the ITI Sohra Admission Desk directly:</p>
              <div className="flex flex-wrap gap-4 mt-2 text-[#333]">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#004a99]" /> {INSTITUTE_INFO.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#004a99]" /> {INSTITUTE_INFO.contactPhone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#004a99]" /> Saitsohpen, Sohra - 793108
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onApply();
              }}
              className="px-4 py-2 bg-[#004a99] hover:bg-[#003875] text-white font-bold text-xs rounded-xs transition-all shrink-0 cursor-pointer shadow-xs"
            >
              Apply Online Now
            </button>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-[#f4f7fa] border-t border-[#ddd] p-4 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#ccc] bg-white hover:bg-[#eee] text-[#1A1A1A] text-xs font-semibold rounded-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#004a99]" />
            <span>Print Brochure</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#333] text-white text-xs font-bold rounded-xs hover:bg-black cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
