import React from 'react';
import {
  Building2,
  CheckCircle2,
  Compass,
  Quote,
  Target
} from 'lucide-react';
import { INSTITUTE_INFO } from '../data/itiData';

interface AboutSectionProps {
  onOpenProspectus: () => void;
  onOpenAdmission: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenProspectus,
  onOpenAdmission
}) => {
  return (
    <section id="about" className="mb-8">
      {/* Section Title matching Variation 13 */}
      <h2 className="gov-section-title">
        About Government ITI Sohra
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
        <div className="lg:col-span-8 space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] m-0">
            Establishment, Growth & ADB Human Capital Project
          </h3>
          
          <p className="text-xs sm:text-sm text-[#333] leading-relaxed m-0">
            <strong>Government Industrial Training Institute (ITI) Sohra</strong> was established in 2011 to cater to the technical education aspirations of youths across Sohra (Cherrapunji) and the wider East Khasi Hills district. In <strong>January 2021</strong>, a permanent modern institutional campus was dedicated at Saitsohpen (near NIT Meghalaya), built under the Asian Development Bank (ADB) assisted project <em>Supporting Human Capital Development in Meghalaya</em> and <em>Enhancing Skill Development Infrastructure in NE States (ESDI)</em> scheme.
          </p>

          <p className="text-xs sm:text-sm text-[#333] leading-relaxed m-0">
            Operating under the Directorate of Employment & Craftsmen Training (DECT), Department of Labour, Government of Meghalaya, the institute prepares trainees through the Craftsmen Training Scheme (CTS), ensuring competency-based skill standards recognized across industries nationwide.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="border border-[#ddd] p-3 bg-[#fcfdfe]">
              <div className="font-bold text-xs text-[#004a99] mb-1">
                National Curriculum
              </div>
              <p className="text-xs text-[#555] m-0">
                NSQF-aligned courses conforming to Directorate General of Training (DGT) standards.
              </p>
            </div>

            <div className="border border-[#ddd] p-3 bg-[#fcfdfe]">
              <div className="font-bold text-xs text-[#004a99] mb-1">
                State Subsidies
              </div>
              <p className="text-xs text-[#555] m-0">
                Tuition fee exemptions and monthly training stipends for Meghalaya ST/SC candidates.
              </p>
            </div>
          </div>
        </div>

        {/* Vice-Principal's Message */}
        <div className="lg:col-span-4 border border-[#bcd0e4] bg-[#EAF0F6] p-4 rounded-xs shadow-2xs">
          <Quote className="w-5 h-5 text-[#004a99] mb-1 opacity-70" />
          <h4 className="font-bold text-sm text-[#1A1A1A] m-0">
            Vice-Principal's Desk
          </h4>
          <p className="text-xs text-[#444] italic mt-2 leading-relaxed m-0">
            "Technical skill is the key to socio-economic mobility. At ITI Sohra, we focus on rigorous workshop practice, safety standards, and real-world trade competence. We welcome the youth of Meghalaya to take advantage of these subsidized vocational programs."
          </p>
          <div className="mt-3 pt-2 border-t border-[#bcd0e4] text-[11px] text-[#555]">
            <strong>Office of the Vice-Principal</strong><br />
            Govt. ITI Sohra, Meghalaya
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-[#ddd] p-4 bg-white shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-[#004a99]" />
            <h4 className="font-bold text-sm text-[#004a99] m-0">Institutional Vision</h4>
          </div>
          <p className="text-xs text-[#444] leading-relaxed m-0">
            To be a premier center of technical and vocational excellence in Meghalaya, developing skilled craftspersons, innovative technicians, and self-employed entrepreneurs who drive regional economic development.
          </p>
        </div>

        <div className="border border-[#ddd] p-4 bg-white shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-[#004a99]" />
            <h4 className="font-bold text-sm text-[#004a99] m-0">Institutional Mission</h4>
          </div>
          <p className="text-xs text-[#444] leading-relaxed m-0">
            To provide NSQF-aligned hands-on vocational training; ensure workshop safety standards; foster apprenticeship collaborations through NAPS; and support indigenous youth with comprehensive fee waivers.
          </p>
        </div>
      </div>
    </section>
  );
};
