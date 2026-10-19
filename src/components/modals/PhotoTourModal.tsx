import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Share, Heart } from 'lucide-react';
import type { ListingPhoto } from '../../types/listing';

interface PhotoTourModalProps {
  isOpen: boolean;
  photos: ListingPhoto[];
  onClose: () => void;
  onOpenLightbox: (photoIndex: number) => void;
  onShareClick: () => void;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  photos,
  onClose,
  onOpenLightbox,
  onShareClick
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        // Keep the tour open when the topmost Lightbox handles Escape first.
        if (document.querySelector('.lightbox-backdrop')) return;
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    'Jacuzzi & Spa',
    'Living Room',
    'Bedroom',
    'Kitchen & Dining',
    'Outdoor & Pool',
    'Bathroom'
  ] as const;

  return (
    <div ref={dialogRef} className="photo-tour-container" role="dialog" aria-label="Photo tour modal" aria-modal="true" tabIndex={-1}>
      <header className="photo-tour-header">
        <button ref={closeButtonRef} className="modal-close-btn" onClick={onClose} aria-label="Close photo tour">
          <ArrowLeft size={20} />
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="icon-action-btn" onClick={onShareClick} aria-label="Share listing">
            <Share size={16} />
            <span>Share</span>
          </button>
          <button className="icon-action-btn" aria-label="Save listing">
            <Heart size={16} />
            <span>Save</span>
          </button>
        </div>
      </header>

      <div className="photo-tour-body">
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>Photo Tour</h1>

        {categories.map((cat) => {
          const categoryPhotos = photos.filter((p) => p.category === cat);
          if (categoryPhotos.length === 0) return null;

          return (
            <div key={cat} style={{ marginBottom: '48px' }}>
              <h2 className="tour-section-title">{cat}</h2>
              <div className="tour-photo-grid">
                {categoryPhotos.map((photo, idx) => {
                  const globalIndex = photos.findIndex((p) => p.id === photo.id);
                  const isFullWidth = idx === 0 && categoryPhotos.length % 2 !== 0;

                  return (
                    <div key={photo.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} className={isFullWidth ? 'grid-span-full' : ''}>
                      <div
                        className={`tour-photo-item ${isFullWidth ? 'full-width' : ''}`}
                        onClick={() => onOpenLightbox(globalIndex)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open photo lightbox: ${photo.caption}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onOpenLightbox(globalIndex);
                          }
                        }}
                      >
                        <img src={photo.url} alt={photo.alt} loading="lazy" />
                      </div>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 400, marginTop: '4px' }}>
                        {photo.caption}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
