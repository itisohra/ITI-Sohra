import React from 'react';
import {
  X,
  Award,
  Clock,
  GraduationCap,
  Users,
  BookOpen,
  Wrench,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Printer
} from 'lucide-react';
import { Trade } from '../data/itiData';

interface TradeDetailModalProps {
  trade: Trade | null;
  onClose: () => void;
  onApplyForTrade: (tradeId: string) => void;
}

export const TradeDetailModal: React.FC<TradeDetailModalProps> = ({
  trade,
  onClose,
  onApplyForTrade
}) => {
  if (!trade) return null;

  const handlePrintSyllabus = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${trade.name} - Syllabus & Trade Overview</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; line-height: 1.6; }
              .header { border-bottom: 2px solid #065f46; padding-bottom: 15px; margin-bottom: 20px; }
              h1 { color: #065f46; font-size: 22px; margin: 0 0 8px 0; }
              .meta { font-size: 13px; color: #64748b; margin-bottom: 10px; }
              .section-title { font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
              ul { padding-left: 20px; font-size: 14px; }
              li { margin-bottom: 6px; }
              .badge { display: inline-block; background: #ecfdf5; color: #065f46; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <span class="badge">Directorate of Employment & Craftsmen Training, Govt. of Meghalaya</span>
              <h1>Govt. ITI Sohra — ${trade.name} (${trade.shortCode})</h1>
              <div class="meta">Duration: ${trade.duration} • Intake: ${trade.totalSeats} Seats • Qualification: ${trade.entryQualification} • NSQF Level: ${trade.nsqfLevel}</div>
            </div>
            <p><strong>Trade Description:</strong> ${trade.description}</p>
            <p><strong>Curriculum Overview:</strong> ${trade.curriculumOverview}</p>
            
            <div class="section-title">Core Curriculum & Syllabus Subjects:</div>
            <ul>
              ${trade.keySubjects.map(s => `<li>${s}</li>`).join('')}
            </ul>

            <div class="section-title">Workshop Machinery & Training Equipment:</div>
            <ul>
              ${trade.workshopEquipment.map(e => `<li>${e}</li>`).join('')}
            </ul>

            <div class="section-title">Employment & Career Opportunities:</div>
            <ul>
              ${trade.careerProspects.map(c => `<li>${c}</li>`).join('')}
            </ul>

            <div style="margin-top: 40px; font-size: 12px; color: #94a3b8; text-align: center;">
              Government Industrial Training Institute (ITI) Sohra • Saitsohpen, Cherrapunji, Meghalaya - 793108
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white border border-black/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="bg-[#004a99] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-1.5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-xs">
              {trade.category} Trade
            </span>
            <span className="text-[10px] bg-white/10 text-white/90 font-medium px-2 py-0.5 rounded-xs">
              {trade.scheme}
            </span>
            <span className="text-[10px] text-white/80 font-semibold">
              NSQF Level {trade.nsqfLevel}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {trade.name}
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-1">
            {trade.tagline}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 font-medium">Duration</div>
                <div className="font-semibold text-slate-900 text-xs sm:text-sm">{trade.duration}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 font-medium">Eligibility</div>
                <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                  {trade.entryQualification.includes('10th') ? '10th Class Pass' : '8th Class Pass'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 font-medium">Annual Seats</div>
                <div className="font-semibold text-slate-900 text-xs sm:text-sm">{trade.totalSeats} Seats</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 font-medium">Affiliation</div>
                <div className="font-semibold text-slate-900 text-xs sm:text-sm">{trade.affiliatedTo}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Trade Overview & Scope</h4>
            <p className="text-slate-600 leading-relaxed">
              {trade.description}
            </p>
            <p className="text-slate-600 leading-relaxed mt-2 text-xs bg-slate-100/70 p-3 rounded-lg border-l-4 border-emerald-600">
              <strong>Curriculum Standard:</strong> {trade.curriculumOverview}
            </p>
          </div>

          {/* Curriculum Subjects */}
          <div>
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-3">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Key Practical & Theoretical Modules</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {trade.keySubjects.map((sub, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workshop Machinery */}
          <div>
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-3">
              <Wrench className="w-4 h-4 text-teal-700" />
              <span>Dedicated Workshop Facilities at Sohra Campus</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {trade.workshopEquipment.map((eq, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-600 bg-teal-50/50 border border-teal-100 px-3 py-2 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                  <span>{eq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Prospects */}
          <div>
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-3">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>Employment & Career Opportunities</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {trade.careerProspects.map((car, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-amber-50/50 border border-amber-100 px-3 py-2 rounded-lg">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-medium">{car}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#F8F7F4] border-t border-black/15 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrintSyllabus}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-black/20 bg-white hover:bg-black/5 text-[#111113] text-xs font-semibold rounded-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#0F392B]" />
            <span>Print Syllabus Copy</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-3 py-2 text-[#111113]/70 hover:text-[#111113] text-xs font-semibold"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApplyForTrade(trade.id);
              }}
              className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0F392B] hover:bg-[#154b38] text-white text-xs font-bold rounded-xs transition-colors"
            >
              <span>Apply for {trade.shortCode}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
