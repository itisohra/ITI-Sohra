import React, { useState } from 'react';
import {
  Wrench,
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  GraduationCap,
  Users,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { TRADES_LIST, Trade } from '../data/itiData';

interface TradeSectionProps {
  onSelectTrade: (trade: Trade) => void;
  onApplyForTrade: (tradeId: string) => void;
  isEditMode?: boolean;
}

export const TradeSection: React.FC<TradeSectionProps> = ({
  onSelectTrade,
  onApplyForTrade,
  isEditMode = false
}) => {
  const [filter, setFilter] = useState<'all' | 'Engineering' | 'Non-Engineering'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredTrades = TRADES_LIST.filter((trade) => {
    if (filter !== 'all' && trade.category !== filter) return false;
    if (
      searchQuery.trim() &&
      !trade.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !trade.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !trade.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <section id="trades" className="mb-8">
      {/* Section Title matching Variation 13: border-bottom: 2px solid #004a99; */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#004a99] pb-2 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#004a99] m-0">
          Available Trades
        </h2>

        {/* View Switcher */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setViewMode('table')}
            className={`px-2.5 py-1 border rounded-xs font-semibold flex items-center gap-1 transition-colors ${
              viewMode === 'table'
                ? 'bg-[#004a99] text-white border-[#004a99]'
                : 'bg-white text-[#1A1A1A] border-[#ccc] hover:bg-[#f4f4f4]'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-2.5 py-1 border rounded-xs font-semibold flex items-center gap-1 transition-colors ${
              viewMode === 'cards'
                ? 'bg-[#004a99] text-white border-[#004a99]'
                : 'bg-white text-[#1A1A1A] border-[#ccc] hover:bg-[#f4f4f4]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Detailed Cards</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 bg-[#f8f9fa] p-2.5 border border-[#ddd]">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap ${
              filter === 'all'
                ? 'bg-[#004a99] text-white'
                : 'bg-white border border-[#ccc] text-[#1A1A1A] hover:bg-[#e9ecef]'
            }`}
          >
            All Trades ({TRADES_LIST.length})
          </button>
          <button
            onClick={() => setFilter('Engineering')}
            className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap ${
              filter === 'Engineering'
                ? 'bg-[#004a99] text-white'
                : 'bg-white border border-[#ccc] text-[#1A1A1A] hover:bg-[#e9ecef]'
            }`}
          >
            Engineering (3)
          </button>
          <button
            onClick={() => setFilter('Non-Engineering')}
            className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap ${
              filter === 'Non-Engineering'
                ? 'bg-[#004a99] text-white'
                : 'bg-white border border-[#ccc] text-[#1A1A1A] hover:bg-[#e9ecef]'
            }`}
          >
            Non-Engineering (2)
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#777] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter trade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs bg-white border border-[#ccc] rounded-xs focus:outline-none focus:border-[#004a99]"
          />
        </div>
      </div>

      {/* Primary Table View matching Variation 13 */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-4 text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f4f4f4] text-[#1A1A1A]">
                <th className="border border-[#ccc] p-3 text-left font-bold">Trade Name</th>
                <th className="border border-[#ccc] p-3 text-left font-bold">Duration</th>
                <th className="border border-[#ccc] p-3 text-left font-bold">Eligibility</th>
                <th className="border border-[#ccc] p-3 text-center font-bold">Seats</th>
                <th className="border border-[#ccc] p-3 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((t) => (
                <tr key={t.id} className="hover:bg-[#fcfdfe] transition-colors">
                  <td className="border border-[#ccc] p-3 font-semibold text-[#1A1A1A]">
                    <div className="text-sm font-bold text-[#004a99]">{t.name}</div>
                    <div className="text-[11px] text-[#555] mt-0.5">{t.tagline}</div>
                  </td>
                  {/* CSS Selector 7: Duration cell */}
                  <td
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    className={`border border-[#ccc] p-3 text-xs sm:text-sm font-medium whitespace-nowrap ${
                      isEditMode ? 'outline-dashed outline-2 outline-blue-600 bg-amber-50/50 cursor-text' : ''
                    }`}
                  >
                    {t.duration}
                  </td>
                  <td className="border border-[#ccc] p-3 text-xs sm:text-sm whitespace-nowrap font-medium text-[#1A1A1A]">
                    {t.entryQualification.includes('10th') ? '10th Pass' : '8th Pass'}
                  </td>
                  <td
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    className={`border border-[#ccc] p-3 text-center font-bold text-[#004a99] whitespace-nowrap ${
                      isEditMode ? 'outline-dashed outline-2 outline-blue-600 bg-amber-50/50 cursor-text' : ''
                    }`}
                  >
                    {t.totalSeats} Seats
                  </td>
                  <td className="border border-[#ccc] p-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onSelectTrade(t)}
                        className="bg-white border border-[#004a99] text-[#004a99] hover:bg-[#EAF0F6] px-2.5 py-1 text-xs font-semibold rounded-xs inline-flex items-center gap-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Syllabus</span>
                      </button>
                      <button
                        onClick={() => onApplyForTrade(t.id)}
                        className="bg-[#004a99] hover:bg-[#003875] text-white px-3 py-1 text-xs font-bold rounded-xs inline-flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Detailed Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {filteredTrades.map((trade) => (
            <div
              key={trade.id}
              className="border border-[#ddd] p-4 bg-white hover:border-[#004a99] transition-all flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2 pb-1 border-b border-[#eee]">
                  <span className="font-bold text-[#004a99]">{trade.category}</span>
                  <span className="text-[#666] font-medium">NSQF Level {trade.nsqfLevel}</span>
                </div>

                <h3 className="font-bold text-base text-[#1A1A1A] leading-snug">
                  {trade.name}
                </h3>
                <p className="text-xs text-[#555] mt-1 leading-relaxed line-clamp-2">
                  {trade.description}
                </p>

                <div className="mt-3 pt-2 border-t border-[#eee] space-y-1 text-xs text-[#444]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#004a99]" />
                    <span>Duration: <strong>{trade.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#004a99]" />
                    <span>Eligibility: <strong>{trade.entryQualification.includes('10th') ? '10th Pass' : '8th Pass'}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#004a99]" />
                    <span>Seats: <strong>{trade.totalSeats} Annual Intake</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#eee] flex items-center justify-between">
                <button
                  onClick={() => onSelectTrade(trade)}
                  className="text-xs font-semibold text-[#004a99] hover:underline flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Syllabus</span>
                </button>
                <button
                  onClick={() => onApplyForTrade(trade.id)}
                  className="bg-[#004a99] hover:bg-[#003875] text-white text-xs font-bold px-3 py-1 rounded-xs flex items-center gap-1"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
