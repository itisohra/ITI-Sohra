import React from 'react';
import {
  Building2,
  Monitor,
  Zap,
  Droplets,
  Layers,
  UtensilsCrossed,
  BookOpen,
  CheckCircle2,
  Users
} from 'lucide-react';
import { FACILITIES_LIST } from '../data/itiData';

export const FacilitiesSection: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'comp-lab':
        return <Monitor className="w-5 h-5 text-[#004a99]" />;
      case 'electrical-bay':
        return <Zap className="w-5 h-5 text-[#004a99]" />;
      case 'plumbing-yard':
        return <Droplets className="w-5 h-5 text-[#004a99]" />;
      case 'masonry-yard':
        return <Layers className="w-5 h-5 text-[#004a99]" />;
      case 'hospitality-lab':
        return <UtensilsCrossed className="w-5 h-5 text-[#004a99]" />;
      case 'library':
        return <BookOpen className="w-5 h-5 text-[#004a99]" />;
      default:
        return <Building2 className="w-5 h-5 text-[#004a99]" />;
    }
  };

  return (
    <section id="facilities" className="mb-8">
      {/* Section Title matching Variation 13 */}
      <h2 className="gov-section-title">
        Workshops & Campus Facilities
      </h2>

      <p className="text-xs sm:text-sm text-[#555] mb-4">
        Constructed at Saitsohpen under the Asian Development Bank (ADB) and ESDI project to provide experiential hands-on vocational learning adhering to NCVT standards.
      </p>

      {/* Facilities Grid with clean cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {FACILITIES_LIST.map((fac) => (
          <div
            key={fac.id}
            className="border border-[#ddd] p-4 bg-white hover:border-[#004a99] transition-colors flex flex-col justify-between shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-[#eee]">
                <div className="flex items-center gap-2">
                  {getIcon(fac.id)}
                  <h3 className="font-bold text-sm sm:text-base text-[#1A1A1A] m-0">
                    {fac.name}
                  </h3>
                </div>
              </div>

              <span className="inline-block bg-[#EAF0F6] text-[#004a99] font-bold text-[10px] px-2 py-0.5 rounded-xs border border-[#bcd0e4] mb-2">
                {fac.category}
              </span>

              <p className="text-xs text-[#555] leading-relaxed mb-3">
                {fac.description}
              </p>

              <div className="space-y-1 text-xs text-[#333] pt-2 border-t border-[#eee]">
                <div className="font-semibold text-[11px] text-[#004a99]">
                  Workshop Highlights:
                </div>
                {fac.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-[#444]">
                    <CheckCircle2 className="w-3 h-3 text-[#004a99] shrink-0 mt-0.5" />
                    <span className="text-[11px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#eee] flex items-center justify-between text-xs text-[#666]">
              <span className="flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-[#004a99]" />
                {fac.capacity}
              </span>
              <span className="font-semibold text-emerald-800">
                Operational
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
