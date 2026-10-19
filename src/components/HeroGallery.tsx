import React from 'react';
import { Grid } from 'lucide-react';
import type { ListingPhoto } from '../types/listing';

interface HeroGalleryProps {
  photos: ListingPhoto[];
  onOpenPhotoTour: () => void;
  onOpenLightbox: (photoIndex: number) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  photos,
  onOpenPhotoTour,
  onOpenLightbox
}) => {
  // First 5 photos for the hero grid
  const heroPhotos = photos.slice(0, 5);

  return (
    <section className="hero-gallery-container" aria-label="Photo gallery preview">
      <div className="hero-grid">
        {heroPhotos.map((photo, index) => {
          const isMain = index === 0;
          return (
            <button
              key={photo.id}
              className={`hero-grid-item ${isMain ? 'main-photo' : ''}`}
              onClick={() => onOpenLightbox(index)}
              aria-label={`View photo ${index + 1}: ${photo.caption}`}
            >
              <img src={photo.url} alt={photo.alt} loading="eager" />
            </button>
          );
        })}
      </div>

      <button
        className="show-all-photos-btn"
        onClick={onOpenPhotoTour}
        aria-label="Show all photos in photo tour"
      >
        <Grid size={16} />
        <span>Show all photos</span>
      </button>
    </section>
  );
};
