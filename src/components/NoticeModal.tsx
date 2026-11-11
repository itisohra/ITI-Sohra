import React from 'react';
import { X, FileText, Download, Calendar, Tag, ShieldCheck, CheckCircle } from 'lucide-react';
import { Notice } from '../data/itiData';

interface NoticeModalProps {
  notice: Notice | null;
  onClose: () => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({ notice, onClose }) => {
  if (!notice) return null;

  const handleDownload = () => {
    // Simulates clean PDF download / print for trainee
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${notice.title}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; line-height: 1.6; }
              .header { text-align: center; border-bottom: 2px solid #0f392b; padding-bottom: 20px; margin-bottom: 24px; }
              .gov { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; }
              .inst { font-size: 20px; font-weight: bold; color: #0f392b; margin: 5px 0; }
              .sub { font-size: 14px; color: #334155; }
              .ref-bar { display: flex; justify-content: space-between; font-size: 13px; color: #475569; margin-bottom: 20px; font-weight: 600; border-bottom: 1px dashed #cbd5e1; padding-bottom: 10px; }
              .title { font-size: 18px; font-weight: bold; color: #0f172a; margin-bottom: 18px; }
              .content { font-size: 15px; margin-bottom: 30px; text-align: justify; }
              .footer { margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end; }
              .seal { border: 2px solid #0f392b; color: #0f392b; padding: 10px 16px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase; text-align: center; }
              .sign { text-align: right; font-size: 14px; font-weight: 600; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="gov">Government of Meghalaya • Department of Labour</div>
              <div class="inst">GOVERNMENT INDUSTRIAL TRAINING INSTITUTE SOHRA</div>
              <div class="sub">Saitsohpen, Sohra (Cherrapunji), East Khasi Hills - 793108 | itisohra@gmail.com</div>
            </div>
            <div class="ref-bar">
              <div>Ref No: ${notice.refNo}</div>
              <div>Date: ${notice.date}</div>
            </div>
            <div class="title">${notice.title}</div>
            <div class="content">${notice.content}</div>
            <div class="footer">
              <div class="seal">Official Copy<br/>Govt. ITI Sohra</div>
              <div class="sign">
                Office of the Vice-Principal<br/>
                Govt. ITI Sohra, Meghalaya
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white border border-black/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#004a99] text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-xs">
                {notice.category}
              </span>
              <p className="text-xs text-white/80 mt-1">Ref: {notice.refNo}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close notice modal"
            className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-black/60 border-b border-black/10 pb-2.5">
            <span className="flex items-center gap-1.5 text-xs text-[#555]">
              <Calendar className="w-3.5 h-3.5 text-[#004a99]" />
              Published: {notice.date}
            </span>
            <span className="text-xs text-[#004a99] font-bold">
              Verified Circular
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] leading-snug">
            {notice.title}
          </h3>

          <div className="bg-[#f9fbfd] p-4 border border-[#ddd] text-[#1A1A1A] text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {notice.content}
          </div>

          {/* Attachment */}
          <div className="p-3.5 border border-[#ccc] bg-[#EAF0F6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#004a99]" />
              <div>
                <p className="text-xs font-bold text-[#1A1A1A]">
                  {notice.attachmentName || 'Official_Circular.pdf'}
                </p>
                <p className="text-[10px] text-[#555]">
                  Size: {notice.fileSize || '450 KB'} • PDF Document
                </p>
              </div>
            </div>
            {notice.fileDataUrl ? (
              <a
                href={notice.fileDataUrl}
                download={notice.attachmentName || 'Official_Circular.pdf'}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xs transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Download Uploaded File ({notice.fileSize || 'Attached'})
              </a>
            ) : (
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#004a99] hover:bg-[#003875] text-white text-xs font-bold rounded-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download / Print PDF
              </button>
            )}
          </div>

          <div className="text-[11px] font-mono text-black/50 pt-2 border-t border-black/10">
            Issued by Office of the Vice-Principal, Govt. ITI Sohra, Meghalaya.
          </div>
        </div>
      </div>
    </div>
  );
};
