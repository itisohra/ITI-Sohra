import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { GalleryItem } from '../data/itiData';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadPhoto: (newPhoto: GalleryItem) => void;
  currentUser?: { email?: string | null } | null;
  onLogin?: () => void;
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  isOpen,
  onClose,
  onUploadPhoto,
  currentUser = null,
  onLogin
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Campus');
  const [tag, setTag] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Process and optimize image via HTML Canvas so it stores efficiently in localStorage
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('Image file is too large. Please select an image under 15 MB.');
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(0)} KB`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize to maximum 1280px on long edge for optimal quality and storage
        const maxDim = 1280;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setPreviewUrl(compressedDataUrl);
        } else {
          setPreviewUrl(event.target?.result as string);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        setErrorMessage('Failed to load image. Please try another image.');
        setIsProcessing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read file.');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    setFileName(null);
    setFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a photo title.');
      return;
    }

    if (!previewUrl) {
      alert('Please select and upload a photo from your computer.');
      return;
    }

    const uniqueId = `photo-${Date.now()}`;
    const newPhoto: GalleryItem = {
      id: uniqueId,
      title: title.trim(),
      category,
      tag: tag.trim() || `${category} Gallery`,
      caption: caption.trim() || title.trim(),
      imageUrl: previewUrl,
      date: date.trim(),
      isRealUpload: true
    };

    onUploadPhoto(newPhoto);
    onClose();

    // Reset
    setTitle('');
    setTag('');
    setCaption('');
    setPreviewUrl(null);
    setFileName(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white border border-[#ccc] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-[#004a99] text-white px-5 py-4 flex items-center justify-between border-b-2 border-[#003875]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-xs">
              <Upload className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold m-0 leading-tight">
                Upload Real Campus Photo
              </h3>
              <p className="text-[11px] text-white/80 m-0 mt-0.5">
                Government ITI Sohra • Official Photo Gallery Desk
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          {currentUser ? (
            <div className="bg-emerald-50 border border-emerald-300 p-3 text-xs text-emerald-950 flex items-center justify-between gap-2 rounded-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <strong>Live Cloud Broadcast Active:</strong> This photo will instantly appear in the gallery for all website visitors (Signed in as <strong>{currentUser.email}</strong>).
                </div>
              </div>
              <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shrink-0 uppercase tracking-wide">
                Live Cloud
              </span>
            </div>
          ) : (
            <div className="bg-[#EAF0F6] border border-[#bcd0e4] p-3 text-xs text-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xs">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#004a99] shrink-0 mt-0.5" />
                <div>
                  <strong>Campus Gallery Desk:</strong> Want this photo to appear for all visitors and students online after launch?
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

          {/* Photo File Upload Box */}
          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
              Select Photo from PC (JPG, PNG, WebP) *
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {!previewUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#004a99]/40 bg-[#fbfcfd] hover:bg-[#f0f5fa] p-6 text-center cursor-pointer transition-colors rounded-xs"
              >
                <ImageIcon className="w-8 h-8 text-[#004a99] mx-auto mb-2 opacity-80" />
                <div className="text-xs sm:text-sm font-bold text-[#004a99]">
                  {isProcessing ? 'Processing image...' : 'Click to Browse & Select Photo'}
                </div>
                <p className="text-[11px] text-[#666] m-0 mt-1">
                  Supports workshop photos, campus views, events, practical classes, and trainees
                </p>
              </div>
            ) : (
              <div className="border border-[#ccc] bg-slate-50 p-3 rounded-xs space-y-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-xs border border-[#ddd] bg-black">
                  <img
                    src={previewUrl}
                    alt="Upload Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-emerald-800 font-semibold flex items-center gap-1 truncate max-w-[70%]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{fileName} ({fileSize})</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-red-600 hover:text-red-800 text-xs font-bold px-2 py-1 bg-white border border-red-200 rounded-xs hover:bg-red-50 cursor-pointer"
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            )}

            {errorMessage && (
              <p className="text-xs text-red-600 mt-1.5 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errorMessage}
              </p>
            )}
          </div>

          {/* Photo Title */}
          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
              Photo Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Wireman Trade Electrical Installation Practical"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#ccc] rounded-xs text-xs sm:text-sm focus:outline-none focus:border-[#004a99]"
            />
          </div>

          {/* Grid: Category & Tag & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                className="w-full px-3 py-2 bg-white border border-[#ccc] rounded-xs text-xs focus:outline-none focus:border-[#004a99]"
              >
                <option value="Campus">Campus Infrastructure</option>
                <option value="Workshops">Workshops & Labs</option>
                <option value="Events">Events & Celebrations</option>
                <option value="Activities">Student Activities</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                Tag / Subheading
              </label>
              <input
                type="text"
                placeholder="e.g. COPA Lab, Main Gate"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#ccc] rounded-xs text-xs focus:outline-none focus:border-[#004a99]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                Date / Year
              </label>
              <input
                type="text"
                placeholder="e.g. November 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#ccc] rounded-xs text-xs focus:outline-none focus:border-[#004a99]"
              />
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
              Photo Caption / Details
            </label>
            <textarea
              rows={2}
              placeholder="Brief description of the photo, trainees, workshop equipment, or campus event..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#ccc] rounded-xs text-xs leading-relaxed focus:outline-none focus:border-[#004a99]"
            />
          </div>

          {/* Actions */}
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
              <span>Add Photo to Gallery</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
