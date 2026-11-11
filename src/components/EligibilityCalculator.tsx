import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { TRADES_LIST, Trade } from '../data/itiData';

interface EligibilityCalculatorProps {
  onSelectTrade: (trade: Trade) => void;
  onApplyForTrade: (tradeId: string) => void;
}

export const EligibilityCalculator: React.FC<EligibilityCalculatorProps> = ({
  onSelectTrade,
  onApplyForTrade
}) => {
  const [education, setEducation] = useState<'all' | '8th' | '10th'>('all');
  const [categoryPref, setCategoryPref] = useState<'all' | 'Engineering' | 'Non-Engineering'>('all');
  const [durationPref, setDurationPref] = useState<'all' | '1' | '2'>('all');

  const filteredTrades = TRADES_LIST.filter((trade) => {
    if (education === '8th' && trade.entryQualification.includes('10th')) {
      return false;
    }
    if (categoryPref !== 'all' && trade.category !== categoryPref) {
      return false;
    }
    if (durationPref !== 'all' && trade.durationYears.toString() !== durationPref) {
      return false;
    }
    return true;
  });

  return (
    <div className="border border-[#ddd] p-5 mb-8 bg-white shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#eee]">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#004a99] m-0">
            Course Eligibility & Trade Finder
          </h3>
          <p className="text-xs text-[#555] m-0 mt-0.5">
            Select your schooling qualification and stream interest to check eligible CTS trades.
          </p>
        </div>
        <span className="bg-[#EAF0F6] text-[#004a99] font-bold text-xs px-2.5 py-1 rounded-xs border border-[#bcd0e4] self-start sm:self-auto">
          {filteredTrades.length} Matching Courses
        </span>
      </div>

      {/* Select Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
            Highest Qualification
          </label>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value as any)}
            className="w-full bg-white border border-[#ccc] p-2 text-xs rounded-xs text-[#1A1A1A] focus:outline-none focus:border-[#004a99]"
          >
            <option value="all">All Qualifications</option>
            <option value="10th">Class 10th (SSLC) Pass or above</option>
            <option value="8th">Class 8th Pass</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
            Stream Interest
          </label>
          <select
            value={categoryPref}
            onChange={(e) => setCategoryPref(e.target.value as any)}
            className="w-full bg-white border border-[#ccc] p-2 text-xs rounded-xs text-[#1A1A1A] focus:outline-none focus:border-[#004a99]"
          >
            <option value="all">All Streams</option>
            <option value="Engineering">Engineering Trades</option>
            <option value="Non-Engineering">Non-Engineering (IT & Hospitality)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
            Course Duration
          </label>
          <select
            value={durationPref}
            onChange={(e) => setDurationPref(e.target.value as any)}
            className="w-full bg-white border border-[#ccc] p-2 text-xs rounded-xs text-[#1A1A1A] focus:outline-none focus:border-[#004a99]"
          >
            <option value="all">Any Duration</option>
            <option value="1">1 Year Courses</option>
            <option value="2">2 Years Courses</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredTrades.map((t) => (
          <div
            key={t.id}
            className="border border-[#ddd] p-3.5 bg-[#fcfdfe] hover:border-[#004a99] transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#004a99]">{t.duration}</span>
                <span className="font-bold text-[#333]">{t.totalSeats} Seats</span>
              </div>
              <h4 className="font-bold text-sm text-[#1A1A1A]">{t.name}</h4>
              <p className="text-xs text-[#666] mt-1 line-clamp-2">{t.tagline}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-[#eee] flex items-center justify-between">
              <button
                onClick={() => onSelectTrade(t)}
                className="text-xs text-[#004a99] hover:underline font-semibold"
              >
                Syllabus
              </button>
              <button
                onClick={() => onApplyForTrade(t.id)}
                className="bg-[#004a99] hover:bg-[#003875] text-white text-xs font-bold px-2.5 py-1 rounded-xs inline-flex items-center gap-1"
              >
                <span>Apply</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
