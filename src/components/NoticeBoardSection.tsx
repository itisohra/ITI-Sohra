import React, { useState } from 'react';
import {
  Bell,
  Search,
  Calendar,
  Eye,
  FileText,
  Upload,
  Trash2,
  Paperclip,
  Plus,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Notice } from '../data/itiData';
import { UploadCircularModal } from './UploadCircularModal';

interface NoticeBoardSectionProps {
  notices: Notice[];
  onSelectNotice: (notice: Notice) => void;
  onAddNotice: (notice: Notice) => void;
  onDeleteNotice: (noticeId: string) => void;
  onClearAllNotices: () => void;
  currentUser?: { email?: string | null } | null;
  onLogin?: () => void;
}

export const NoticeBoardSection: React.FC<NoticeBoardSectionProps> = ({
  notices,
  onSelectNotice,
  onAddNotice,
  onDeleteNotice,
  onClearAllNotices,
  currentUser = null,
  onLogin
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const categories = ['All', 'Admissions', 'Examinations', 'Results', 'Office Order', 'Tenders', 'General'];

  const filteredNotices = notices.filter((n) => {
    if (activeCategory !== 'All' && n.category !== activeCategory) {
      return false;
    }
    if (
      searchQuery.trim() &&
      !n.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !n.refNo.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !n.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleDelete = (e: React.MouseEvent, notice: Notice) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete circular:\n"${notice.title}"?`)) {
      onDeleteNotice(notice.id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL circulars from the notice board?')) {
      onClearAllNotices();
    }
  };

  return (
    <section id="notices" className="mb-8">
      {/* Section Header with Upload Platform Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#004a99] pb-2 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#004a99] m-0 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#004a99]" />
            <span>Official Circulars & Notifications</span>
          </h2>
          <p className="text-xs text-[#555] m-0 mt-0.5">
            Published official orders, notices, and examination circulars from Govt. ITI Sohra
          </p>
        </div>

        {/* Admin Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#004a99] hover:bg-[#003875] text-white px-3.5 py-1.5 rounded-xs text-xs font-bold shadow-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Upload a new official office circular (PDF/DOC/Image)"
          >
            <Upload className="w-3.5 h-3.5 text-amber-300" />
            <span>+ Upload Office Circular</span>
          </button>

          {notices.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="bg-white hover:bg-red-50 text-red-600 border border-red-300 px-2.5 py-1.5 rounded-xs text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
              title="Delete all circulars currently on the board"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* When circulars exist: Top Bullet Highlights List */}
      {notices.length > 0 && (
        <div className="bg-[#fcfdfe] border border-[#d2dfec] p-3.5 mb-4 rounded-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-bold text-[#004a99] uppercase tracking-wide">
              Recent Official Circulars:
            </div>
            <span className="text-[11px] bg-[#EAF0F6] text-[#004a99] font-bold px-2 py-0.5 rounded-xs border border-[#bcd0e4]">
              {notices.length} Published Circular{notices.length !== 1 ? 's' : ''}
            </span>
          </div>
          <ul className="list-disc pl-5 m-0 space-y-1.5 text-xs sm:text-sm text-[#1A1A1A]">
            {notices.slice(0, 3).map((n) => (
              <li key={n.id}>
                <strong>{n.date}:</strong>{' '}
                <button
                  onClick={() => onSelectNotice(n)}
                  className="text-[#004a99] hover:underline font-medium text-left cursor-pointer"
                >
                  {n.title}
                </button>
                {n.fileDataUrl && (
                  <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] text-emerald-800 bg-emerald-100 font-bold px-1.5 py-0.2 rounded-xs">
                    <Paperclip className="w-2.5 h-2.5" />
                    <span>Real Doc</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 bg-[#f8f9fa] p-2.5 border border-[#ddd]">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#004a99] text-white shadow-2xs'
                  : 'bg-white border border-[#ccc] text-[#1A1A1A] hover:bg-[#e9ecef]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#777] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs bg-white border border-[#ccc] rounded-xs focus:outline-none focus:border-[#004a99]"
          />
        </div>
      </div>

      {/* Circulars Table View or Empty State */}
      {notices.length === 0 ? (
        <div className="border border-dashed border-[#004a99]/40 p-8 text-center bg-[#fdfefe] rounded-xs space-y-3">
          <div className="w-12 h-12 bg-[#EAF0F6] text-[#004a99] rounded-full flex items-center justify-center mx-auto shadow-2xs">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1A1A1A] m-0">
              No Circulars Currently Published
            </h3>
            <p className="text-xs text-[#666] max-w-md mx-auto mt-1 leading-relaxed">
              All generated sample circulars have been cleared. As the office administrator, you can now upload and publish real office notifications, tenders, orders, or admission circulars.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#004a99] hover:bg-[#003875] text-white text-xs font-bold rounded-xs shadow-xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-300" />
            <span>+ Upload Your First Office Circular</span>
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-2 text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f4f4f4] text-[#1A1A1A] border border-[#ccc]">
                <th className="border border-[#ccc] p-2.5 text-left font-bold">Date</th>
                <th className="border border-[#ccc] p-2.5 text-left font-bold">Category</th>
                <th className="border border-[#ccc] p-2.5 text-left font-bold">Notification Title & Ref No</th>
                <th className="border border-[#ccc] p-2.5 text-center font-bold">Attachment</th>
                <th className="border border-[#ccc] p-2.5 text-center font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="border border-[#ccc] p-5 text-center text-[#777]">
                    No circulars match your search or category filter.
                  </td>
                </tr>
              ) : (
                filteredNotices.map((n) => (
                  <tr key={n.id} className="hover:bg-[#fcfdfe] transition-colors">
                    <td className="border border-[#ccc] p-2.5 whitespace-nowrap font-medium text-[#555] text-xs">
                      {n.date}
                    </td>
                    <td className="border border-[#ccc] p-2.5 whitespace-nowrap">
                      <span className="bg-[#EAF0F6] text-[#004a99] font-bold text-[11px] px-2 py-0.5 rounded-xs border border-[#bcd0e4]">
                        {n.category}
                      </span>
                    </td>
                    <td className="border border-[#ccc] p-2.5">
                      <button
                        onClick={() => onSelectNotice(n)}
                        className="text-left font-bold text-[#1A1A1A] hover:text-[#004a99] hover:underline cursor-pointer block"
                      >
                        {n.title}
                      </button>
                      <div className="text-[11px] text-[#777] mt-0.5">
                        Ref: {n.refNo}
                      </div>
                    </td>
                    <td className="border border-[#ccc] p-2.5 text-center whitespace-nowrap">
                      {n.attachmentName ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#004a99] font-semibold bg-[#EAF0F6] px-2 py-0.5 rounded-xs border border-[#bcd0e4]">
                          <Paperclip className="w-3 h-3" />
                          <span className="max-w-[110px] truncate">{n.attachmentName}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#888] italic">Official Notice</span>
                      )}
                    </td>
                    <td className="border border-[#ccc] p-2.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onSelectNotice(n)}
                          className="bg-[#004a99] hover:bg-[#003875] text-white px-2.5 py-1 rounded-xs text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                          title="View Circular Details"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>

                        <button
                          onClick={(e) => handleDelete(e, n)}
                          className="bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-400 p-1 rounded-xs text-xs font-semibold inline-flex items-center cursor-pointer transition-colors"
                          title="Delete this circular"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Circular Upload Modal */}
      <UploadCircularModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadNotice={onAddNotice}
        currentUser={currentUser}
        onLogin={onLogin}
      />
    </section>
  );
};
