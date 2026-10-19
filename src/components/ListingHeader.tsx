import React, { useState } from 'react';
import { Share, Heart, Star, Award } from 'lucide-react';

interface ListingHeaderProps {
  title: string;
  rating: number;
  reviewsCount: number;
  isSuperhost: boolean;
  location: string;
  onShareClick: () => void;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  rating,
  reviewsCount,
  isSuperhost,
  location,
  onShareClick
}) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="listing-title-section">
      <h1 className="listing-title">{title}</h1>

      <div className="listing-action-bar">
        <div className="listing-meta">
          <div className="meta-rating">
            <Star size={14} fill="#222222" stroke="none" />
            <span>{rating.toFixed(2)}</span>
          </div>
          <span>·</span>
          <a href="#reviews" className="meta-reviews" style={{ textDecoration: 'underline', fontWeight: 600 }}>
            {reviewsCount} reviews
          </a>
          <span>·</span>
          {isSuperhost && (
            <>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Award size={14} /> Superhost
              </span>
              <span>·</span>
            </>
          )}
          <a href="#location" className="meta-location">
            {location}
          </a>
        </div>

        <div className="action-buttons">
          <button className="icon-action-btn" onClick={onShareClick} aria-label="Share listing">
            <Share size={16} />
            <span>Share</span>
          </button>

          <button
            className="icon-action-btn"
            onClick={() => setIsSaved(!isSaved)}
            aria-label={isSaved ? 'Saved to wishlist' : 'Save to wishlist'}
            aria-pressed={isSaved}
          >
            <Heart
              size={16}
              fill={isSaved ? '#FF385C' : 'none'}
              stroke={isSaved ? '#FF385C' : '#222222'}
              style={{ transition: 'transform 0.2s ease' }}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
