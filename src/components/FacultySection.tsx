import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Briefcase,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { STAFF_MEMBERS } from '../data/itiData';

export const FacultySection: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<'All' | 'Instructional Staff' | 'Administration' | 'Technical Staff'>('All');

  const filteredStaff = STAFF_MEMBERS.filter((s) => {
    if (roleFilter !== 'All' && s.role !== roleFilter) return false;
    return true;
  });

  return (
    <section id="faculty" className="mb-8">
      {/* Section Title matching Variation 13 */}
      <h2 className="gov-section-title">
        Faculty & Administration Directory
      </h2>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
        {['All', 'Instructional Staff', 'Administration', 'Technical Staff'].map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role as any)}
            className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap ${
              roleFilter === role
                ? 'bg-[#004a99] text-white shadow-2xs'
                : 'bg-white border border-[#ccc] text-[#1A1A1A] hover:bg-[#e9ecef]'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className="border border-[#ddd] p-4 bg-white hover:border-[#004a99] transition-colors flex flex-col justify-between shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="bg-[#EAF0F6] text-[#004a99] font-bold text-[10px] px-2 py-0.5 rounded-xs border border-[#bcd0e4]">
                  {staff.role}
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#1A1A1A] m-0">
                {staff.name}
              </h3>

              <p className="text-xs font-semibold text-[#004a99] mt-0.5 m-0">
                {staff.designation}
              </p>

              {staff.trade && (
                <div className="text-[11px] font-medium text-[#444] bg-[#f4f7fa] px-1.5 py-0.5 mt-1.5 border border-[#eee]">
                  {staff.trade}
                </div>
              )}

              <div className="mt-3 pt-2 border-t border-[#eee] space-y-1 text-xs text-[#555]">
                <div className="flex items-start gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#004a99] shrink-0 mt-0.5" />
                  <span className="text-[11px]">{staff.qualification}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#004a99] shrink-0 mt-0.5" />
                  <span className="text-[11px]">{staff.experience}</span>
                </div>
              </div>
            </div>

            {staff.email && (
              <div className="mt-3 pt-2 border-t border-[#eee] text-[11px] text-[#666] flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-[#004a99]" />
                <span className="truncate">{staff.email}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
