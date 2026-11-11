import React, { useState } from 'react';
import {
  Image as ImageIcon,
  X,
  Maximize2,
  Upload,
  Trash2,
  Download,
  Calendar,
  Tag,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { GalleryItem } from '../data/itiData';
import { UploadPhotoModal } from './UploadPhotoModal';

interface GallerySectionProps {
  photos: GalleryItem[];
  onAddPhoto: (photo: GalleryItem) => void;
  onDeletePhoto: (photoId: string) => void;
  onClearAllPhotos: () => void;
  currentUser?: { email?: string | null } | null;
  onLogin?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  photos,
  onAddPhoto,
  onDeletePhoto,
  onClearAllPhotos,
  currentUser = null,
  onLogin
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const categories = ['All', 'Campus', 'Workshops', 'Events', 'Activities', 'Other'];

  const filteredItems = photos.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    return true;
  });

  const handleDelete = (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete this photo:\n"${item.title}"?`)) {
      onDeletePhoto(item.id);
      if (activeItem?.id === item.id) {
        setActiveItem(null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all photos from the gallery?')) {
      onClearAllPhotos();
      setActiveItem(null);
    }
  };

  return (
    <section id="gallery" className="mb-8">
      {/* Section Header with Upload Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#004a99] pb-2 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#004a99] m-0 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#004a99]" />
            <span>Campus Life & Workshops Gallery</span>
          </h2>
          <p className="text-xs text-[#555] m-0 mt-0.5">
            Photographs of workshops, practical training, campus infrastructure, and events at ITI Sohra
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#004a99] hover:bg-[#003875] text-white px-3.5 py-1.5 rounded-xs text-xs font-bold shadow-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Upload a real photograph from your PC"
          >
            <Upload className="w-3.5 h-3.5 text-amber-300" />
            <span>+ Upload Photo</span>
          </button>

          {photos.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="bg-white hover:bg-red-50 text-red-600 border border-red-300 px-2.5 py-1.5 rounded-xs text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
              title="Clear all photos from gallery"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between gap-2 mb-4 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#004a99] text-white shadow-2xs'
                  : 'bg-white border border-[#ccc] text-[#1A1A1A] hover:bg-[#e9ecef]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-[#666] font-semibold shrink-0">
          Showing {filteredItems.length} of {photos.length} Photo{photos.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Gallery Cards Grid or Empty State */}
      {photos.length === 0 ? (
        <div className="border-2 border-dashed border-[#004a99]/40 p-8 text-center bg-[#fdfefe] rounded-xs space-y-3">
          <div className="w-12 h-12 bg-[#EAF0F6] text-[#004a99] rounded-full flex items-center justify-center mx-auto shadow-2xs">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1A1A1A] m-0">
              No Photos in Gallery Yet
            </h3>
            <p className="text-xs text-[#666] max-w-md mx-auto mt-1 leading-relaxed">
              Upload real photographs of ITI Sohra campus, workshop practical sessions, trainee activities, and official events.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#004a99] hover:bg-[#003875] text-white text-xs font-bold rounded-xs shadow-xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-300" />
            <span>+ Upload Your First Campus Photo</span>
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="border border-[#ccc] p-6 text-center bg-white text-xs text-[#666]">
          No photos found under the "{selectedCategory}" category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="border border-[#ddd] bg-white hover:border-[#004a99] cursor-pointer transition-all flex flex-col justify-between shadow-2xs group rounded-xs overflow-hidden"
            >
              {/* Photo Image Container */}
              <div className="relative h-44 bg-[#081d58] overflow-hidden flex items-center justify-center">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="p-3 text-white flex flex-col justify-between w-full h-full bg-gradient-to-br from-[#004a99] to-[#00224a]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs">
                        {item.tag}
                      </span>
                    </div>
                    <div>
                      <ImageIcon className="w-6 h-6 text-white/60 mb-1" />
                      <div className="text-xs font-bold leading-tight line-clamp-2">
                        {item.title}
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlaid Badges and Controls */}
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shadow-xs">
                    {item.tag}
                  </span>
                  {item.isRealUpload && (
                    <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                      Real Photo
                    </span>
                  )}
                </div>

                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, item)}
                    className="bg-black/60 hover:bg-red-600 text-white p-1 rounded-xs transition-colors"
                    title="Delete photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="bg-black/60 text-white p-1 rounded-xs group-hover:bg-[#004a99] transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Photo Details Footer */}
              <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A] m-0 line-clamp-1 group-hover:text-[#004a99]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#555] line-clamp-2 m-0 mt-1 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#eee] flex items-center justify-between text-[11px] text-[#777]">
                  <span className="font-medium text-[#004a99]">{item.category}</span>
                  <span className="text-[#004a99] font-bold group-hover:underline">
                    View Photo →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white border border-[#ccc] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[92vh]">
            
            {/* Top Bar */}
            <div className="bg-[#004a99] px-4 py-3 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <span className="text-xs bg-white/20 font-bold px-2 py-0.5 rounded-xs shrink-0">
                  {activeItem.category}
                </span>
                <span className="text-xs text-white/90 truncate font-semibold">
                  {activeItem.tag}
                </span>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                aria-label="Close photo"
                className="p-1 rounded hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Viewer */}
            <div className="bg-black/95 flex items-center justify-center overflow-hidden max-h-[55vh]">
              {activeItem.imageUrl ? (
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="max-w-full max-h-[55vh] object-contain"
                />
              ) : (
                <div className="p-12 text-center text-white/70 space-y-2">
                  <ImageIcon className="w-12 h-12 mx-auto text-white/40" />
                  <p className="text-xs">Archive record for ITI Sohra Campus</p>
                </div>
              )}
            </div>

            {/* Photo Info & Caption */}
            <div className="p-4 bg-white space-y-2 overflow-y-auto">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#1A1A1A] m-0">
                    {activeItem.title}
                  </h3>
                  {activeItem.date && (
                    <p className="text-[11px] text-[#666] m-0 mt-0.5">
                      Date / Session: {activeItem.date}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeItem.imageUrl && (
                    <a
                      href={activeItem.imageUrl}
                      download={`${activeItem.title.replace(/\s+/g, '_')}.jpg`}
                      className="px-3 py-1.5 bg-[#004a99] hover:bg-[#003875] text-white text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, activeItem)}
                    className="px-2.5 py-1.5 bg-white border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-xs inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#444] leading-relaxed bg-[#f9fafb] p-3 border border-[#eee] rounded-xs m-0">
                {activeItem.caption}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2 bg-[#EAF0F6] flex items-center justify-between text-xs text-[#555] border-t border-[#ccc]">
              <span>Government ITI Sohra • Official Photo Archive</span>
              <button
                onClick={() => setActiveItem(null)}
                className="px-3 py-1 bg-white border border-[#ccc] text-[#1A1A1A] hover:bg-[#eee] text-xs font-semibold rounded-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      <UploadPhotoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadPhoto={onAddPhoto}
        currentUser={currentUser}
        onLogin={onLogin}
      />
    </section>
  );
};
