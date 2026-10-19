import React from 'react';
import { Star, Trophy } from 'lucide-react';
import type { HostInfo } from '../types/listing';

interface HostHeaderProps {
  host: HostInfo;
  guestsCount: number;
  bedroomsCount: number;
  bedsCount: number;
  bathsCount: number;
  rating: number;
  reviewsCount: number;
  isGuestFavorite: boolean;
}

export const HostHeader: React.FC<HostHeaderProps> = ({
  host,
  guestsCount,
  bedroomsCount,
  bedsCount,
  bathsCount,
  rating,
  reviewsCount,
  isGuestFavorite
}) => {
  return (
    <div className="host-header-section">
      <div className="host-header-card">
        <div className="host-details">
          <h2>Entire rental unit hosted by {host.name}</h2>
          <div className="host-subtext">
            {guestsCount} guests · {bedroomsCount} bedroom · {bedsCount} bed · {bathsCount} bath
          </div>
        </div>

        <div className="host-avatar-wrapper">
          <img src={host.avatar} alt={host.name} className="host-avatar-img" />
          {host.isSuperhost && (
            <div className="superhost-badge-icon" title="Superhost">
              <Trophy size={10} fill="white" />
            </div>
          )}
        </div>
      </div>

      {isGuestFavorite && (
        <div className="guest-favorite-card" role="region" aria-label="Guest favorite badge">
          <div className="gf-badge-section">
            <svg viewBox="0 0 32 32" className="gf-laurel-icon" fill="currentcolor">
              <path d="M16 1a1 1 0 0 1 .993.883L17 2v28a1 1 0 0 1-1.993.117L15 30V2a1 1 0 0 1 1-1zM9.5 5.5a1 1 0 0 1 .993.883L10.5 6.5v19a1 1 0 0 1-1.993.117L8.5 25.5v-19a1 1 0 0 1 1-1zm13 0a1 1 0 0 1 .993.883L23.5 6.5v19a1 1 0 0 1-1.993.117L21.5 25.5v-19a1 1 0 0 1 1-1z"></path>
            </svg>
            <div>
              <div className="gf-title">Guest favorite</div>
              <div className="gf-subtitle">
                One of the most loved homes on Airbnb, according to guests
              </div>
            </div>
          </div>

          <div className="gf-score">
            <div className="gf-score-number">{rating.toFixed(2)}</div>
            <div className="gf-score-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#222222" stroke="none" />
              ))}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {reviewsCount} Reviews
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
