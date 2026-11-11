import React, { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Plus, Calendar, Tag, ShieldCheck } from 'lucide-react';
import { Notice } from '../data/itiData';

interface UploadCircularModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadNotice: (newNotice: Notice) => void;
  currentUser?: { email?: string | null } | null;
  onLogin?: () => void;
}

export const UploadCircularModal: React.FC<UploadCircularModalProps> = ({
  isOpen,
  onClose,
  onUploadNotice,
  currentUser = null,
  onLogin
}) => {
  const [title, setTitle] = useState('');
  const [refNo, setRefNo] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  });
  const [category, setCategory] = useState<Notice['category']>('General');
  const [content, setContent] = useState('');
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    size: string;
    dataUrl?: string;
    type: string;
  } | null>(null);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError(null);

    // Limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds 10 MB limit. Please upload a smaller file.');
      return;
    }

    setIsReadingFile(true);
    const sizeStr = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setAttachedFile({
        name: file.name,
        size: sizeStr,
        dataUrl: result,
        type: file.type
      });
      setIsReadingFile(false);
    };
    reader.onerror = () => {
      setFileError('Failed to read file. Please try again.');
      setIsReadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter circular title.');
      return;
    }

    if (!content.trim()) {
      alert('Please provide circular details or description.');
      return;
    }

    const uniqueId = `circ-${Date.now()}`;
    const generatedRef = refNo.trim() || `DET-SOH/CIR/${new Date().getFullYear()}/${Math.floor(10 + Math.random() * 90)}`;

    const newNotice: Notice = {
      id: uniqueId,
      title: title.trim(),
      date: date.trim() || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      category,
      refNo: generatedRef,
      isNew: true,
      content: content.trim(),
      attachmentName: attachedFile?.name,
      fileSize: attachedFile?.size,
      fileDataUrl: attachedFile?.dataUrl,
      fileType: attachedFile?.type,
      isRealUpload: true
    };

    onUploadNotice(newNotice);
    onClose();

    // Reset form
    setTitle('');
    setRefNo('');
    setContent('');
    setAttachedFile(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white border border-[#ccc] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#004a99] text-white px-5 py-4 flex items-center justify-between border-b-2 border-[#003875]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-xs">
              <Upload className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold m-0 leading-tight">
                Upload Real Office Circular / Notification
              </h3>
              <p className="text-[11px] text-white/80 m-0 mt-0.5">
                Government ITI Sohra • Official Circular Management Desk
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          {currentUser ? (
            <div className="bg-emerald-50 border border-emerald-300 p-3 text-xs text-emerald-950 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <strong>Live Cloud Broadcast Active:</strong> This circular will instantly publish to all students and public visitors online (Signed in as <strong>{currentUser.email}</strong>).
                </div>
              </div>
              <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shrink-0 uppercase tracking-wide">
                Live Cloud
              </span>
            </div>
          ) : (
            <div className="bg-[#EAF0F6] border border-[#bcd0e4] p-3 text-xs text-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#004a99] shrink-0 mt-0.5" />
                <div>
                  <strong>Official Notice Desk:</strong> Want this circular to be visible to all students and visitors on their phones after launch?
                </div>
              </div>
              {onLogin && (
                <button
                  type="button"
                  onClick={onLogin}
                  className="bg-[#004a99] hover:bg-[#003875] text-white text-xs font-bold px-3 py-1.5 rounded-xs transition-colors shadow-2xs shrink-0 cursor-pointer"
                >
                  Sign In with Google
                </button>
              )}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
              Circular / Notification Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Admission Notification 2027-2028: Online Registration Schedule"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#ccc] rounded-xs text-xs sm:text-sm focus:outline-none focus:border-[#004a99]"
            />
          </div>

          {/* Grid: Ref No, Date, Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                Reference No. *
              </label>
              <input
                type="text"
                placeholder="e.g. DET-SOH/ADM/2027-28/01"
                value={refNo}
                onChange={(e) => setRefNo(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#ccc] rounded-xs text-xs focus:outline-none focus:border-[#004a99]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                Issue Date *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. November 4, 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#ccc] rounded-xs text-xs focus:outline-none focus:border-[#004a99]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                Notice Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Notice['category'])}
                className="w-full px-3 py-2 bg-white border border-[#ccc] rounded-xs text-xs focus:outline-none focus:border-[#004a99]"
              >
                <option value="Admissions">Admissions</option>
                <option value="Examinations">Examinations</option>
                <option value="Results">Results / Merit List</option>
                <option value="Office Order">Office Order</option>
                <option value="Tenders">Tender Notice</option>
                <option value="Recruitment">Recruitment / Walk-in</option>
                <option value="General">General Notice</option>
              </select>
            </div>
          </div>

          {/* Content / Body Text */}
          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
              Full Circular Text / Details *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Paste or type the official notification body, schedule, instructions, eligibility criteria, or committee orders..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#ccc] rounded-xs text-xs leading-relaxed focus:outline-none focus:border-[#004a99]"
            />
          </div>

          {/* Real File Upload Section */}
          <div className="border border-dashed border-[#004a99]/40 bg-[#fbfcfd] p-4 rounded-xs">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-[#004a99]">
                Attach Real Circular Document (PDF, Word, or Scanned Image)
              </label>
              <span className="text-[10px] text-[#666]">Max 10 MB (.pdf, .doc, .png, .jpg)</span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />

            {!attachedFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-[#ccc] bg-white p-4 text-center cursor-pointer hover:bg-[#f0f5fa] transition-colors rounded-xs"
              >
                <Upload className="w-6 h-6 text-[#004a99] mx-auto mb-1.5 opacity-80" />
                <div className="text-xs font-bold text-[#004a99]">
                  {isReadingFile ? 'Reading document...' : 'Click to Browse & Upload Circular File (PDF/DOC/Image)'}
                </div>
                <div className="text-[11px] text-[#777] mt-0.5">
                  The actual file will be attached for trainees to download/view directly
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-bold text-emerald-950 truncate">
                      {attachedFile.name}
                    </div>
                    <div className="text-[11px] text-emerald-700">
                      Size: {attachedFile.size} • Attached & ready to publish
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-xs text-red-600 hover:text-red-800 font-bold px-2 py-1 bg-white border border-red-200 rounded-xs hover:bg-red-50 shrink-0 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {fileError && (
              <p className="text-xs text-red-600 mt-1.5 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {fileError}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#ddd]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#ccc] bg-white text-[#1A1A1A] hover:bg-[#f4f4f4] text-xs font-semibold rounded-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#004a99] hover:bg-[#003875] text-white text-xs font-bold rounded-xs shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Publish Official Circular</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
