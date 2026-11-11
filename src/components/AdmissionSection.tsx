import React from 'react';
import {
  GraduationCap,
  Sparkles,
  FileCheck,
  ShieldCheck,
  Download,
  ArrowRight
} from 'lucide-react';
import { ADMISSION_STEPS, FEE_STRUCTURE, INSTITUTE_INFO } from '../data/itiData';

interface AdmissionSectionProps {
  onOpenAdmission: () => void;
  onOpenProspectus: () => void;
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({
  onOpenAdmission,
  onOpenProspectus
}) => {
  return (
    <section id="admissions" className="mb-8">
      {/* Section Title matching Variation 13 */}
      <h2 className="gov-section-title">
        Admission Process
      </h2>

      {/* Process Card matching Variation 13 */}
      <div className="border border-[#ddd] p-5 mb-6 bg-white shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <h3 className="text-base font-bold text-[#1A1A1A] mb-2">
              How to Enroll for Session 2027-2028:
            </h3>
            <p className="text-sm leading-relaxed text-[#1A1A1A] m-0 space-y-1">
              <strong>1. Check Trade Eligibility:</strong> Age minimum 14 years, Class 8th or 10th Pass.<br />
              <strong>2. Submit Online/Offline Application:</strong> Fill online pre-registration or submit form at ITI Sohra.<br />
              <strong>3. Document Verification:</strong> Present marksheet, Meghalaya ST certificate, and residential proof.<br />
              <strong>4. Merit List Declaration:</strong> Merit list published on basis of qualifying examination scores.<br />
              <strong>5. Fee Payment & Admission:</strong> Nominal state fee payment, uniform guidelines, and seat allotment.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2.5 pt-2 md:pt-0">
            <button
              onClick={onOpenProspectus}
              className="bg-[#004a99] hover:bg-[#003875] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xs transition-colors text-center"
            >
              Download Prospectus
            </button>
            <button
              onClick={onOpenAdmission}
              className="bg-white border border-[#004a99] text-[#004a99] hover:bg-[#EAF0F6] font-bold text-xs sm:text-sm px-4 py-2 rounded-xs transition-colors text-center inline-flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Online Pre-Registration Form</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column: Government Fee Table & Required Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-4">
        
        {/* Fee Table */}
        <div className="lg:col-span-7">
          <h3 className="text-base font-bold text-[#004a99] mb-2 pb-1 border-b border-[#ddd]">
            Government Fee Structure
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse mb-2 text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#f4f4f4] text-[#1A1A1A]">
                  <th className="border border-[#ccc] p-2.5 text-left font-bold">Item Particulars</th>
                  <th className="border border-[#ccc] p-2.5 text-left font-bold">Government Rate</th>
                  <th className="border border-[#ccc] p-2.5 text-left font-bold">Concessions / Remarks</th>
                </tr>
              </thead>
              <tbody>
                {FEE_STRUCTURE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#fcfdfe]">
                    <td className="border border-[#ccc] p-2.5 font-semibold text-[#1A1A1A]">{item.item}</td>
                    <td className="border border-[#ccc] p-2.5 font-bold text-[#004a99]">{item.amount}</td>
                    <td className="border border-[#ccc] p-2.5 text-xs text-[#555]">{item.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-[#EAF0F6] border border-[#bcd0e4] text-xs text-[#1A1A1A] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#004a99] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Meghalaya ST / SC Welfare Benefits:</strong> Monthly vocational training stipends and post-matric financial assistance provided by Department of Labour, Government of Meghalaya.
            </div>
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="lg:col-span-5">
          <h3 className="text-base font-bold text-[#004a99] mb-2 pb-1 border-b border-[#ddd]">
            Verification Documents Required
          </h3>

          <div className="border border-[#ddd] p-4 bg-white shadow-2xs">
            <p className="text-xs text-[#555] mb-2.5">
              Original certificates + 2 attested copies to be submitted at ITI Sohra Campus, Saitsohpen:
            </p>

            <ul className="list-disc pl-5 m-0 space-y-1.5 text-xs text-[#1A1A1A]">
              <li>Mark Sheet & Admit Card of Class 8th / Class 10th (SSLC)</li>
              <li>Meghalaya ST / SC Certificate issued by DC / SDO</li>
              <li>Permanent Residential Certificate (PRC) / EPIC / Aadhaar Card</li>
              <li>Four (4) recent Passport-size colour photographs</li>
              <li>Transfer Certificate (TC) or School Leaving Certificate</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
