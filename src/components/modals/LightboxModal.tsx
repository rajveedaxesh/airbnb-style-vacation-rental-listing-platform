import React, { useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Share, Heart } from 'lucide-react';
import type { ListingPhoto } from '../../types/listing';

interface LightboxModalProps {
  isOpen: boolean;
  currentIndex: number;
  photos: ListingPhoto[];
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onShareClick: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  currentIndex,
  photos,
  onClose,
  onNavigate,
  onShareClick
}) => {
  const currentPhoto = photos[currentIndex];
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    const nextIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    onNavigate(nextIndex);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    onNavigate(nextIndex);
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          e.stopImmediatePropagation();
          handlePrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          e.stopImmediatePropagation();
          handleNext();
          break;
        case 'Escape':
          e.preventDefault();
          e.stopImmediatePropagation();
          onClose();
          break;
        case 'Tab': {
          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable?.length) break;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown, true);
      previouslyFocused?.focus();
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="lightbox-backdrop"
      ref={dialogRef}
      role="dialog"
      aria-label="Photo Lightbox viewer"
      aria-modal="true"
    >
      {/* Top Bar */}
      <div className="lightbox-top-bar">
        <button
          ref={closeButtonRef}
          className="lightbox-action-btn"
          onClick={onClose}
          aria-label="Close photo viewer (Escape)"
        >
          <X size={20} />
        </button>

        <div className="lightbox-counter" aria-live="polite">
          {currentIndex + 1} / {photos.length}
        </div>

        <div className="lightbox-controls">
          <button className="lightbox-action-btn" onClick={onShareClick} aria-label="Share photo">
            <Share size={18} />
          </button>
          <button className="lightbox-action-btn" aria-label="Save photo">
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="lightbox-stage">
        <button
          className="lightbox-nav-btn"
          onClick={handlePrev}
          aria-label="Previous photo (Left arrow)"
        >
          <ChevronLeft size={28} />
        </button>

        <div className="lightbox-image-wrapper">
          <img
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt={currentPhoto.alt}
            className="lightbox-active-img"
          />
        </div>

        <button
          className="lightbox-nav-btn"
          onClick={handleNext}
          aria-label="Next photo (Right arrow)"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div className="lightbox-caption-bar">
        <div style={{ fontWeight: 600 }}>{currentPhoto.category}</div>
        <div>{currentPhoto.caption}</div>
      </div>
    </div>
  );
};
