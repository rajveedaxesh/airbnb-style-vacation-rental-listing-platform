import React from 'react';
import { MapPin, Compass } from 'lucide-react';

interface LocationSectionProps {
  location: string;
  coordinates: { lat: number; lng: number };
}

export const LocationSection: React.FC<LocationSectionProps> = ({ location }) => {
  return (
    <div className="location-section" id="location">
      <h2>Where you'll be</h2>
      <div className="location-sub">{location}</div>

      <div className="map-container" role="region" aria-label="Location map">
        <div className="map-canvas">
          <div className="map-overlay-card">
            <div className="map-pin-pulse" />
            <MapPin size={18} color="#FF385C" />
            <span>Candolim, North Goa</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', gap: '24px', fontSize: '15px', color: 'var(--text-dark)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <Compass size={20} color="#222222" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Prime Candolim Location</div>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Located in a quiet, upscale neighborhood 800m from Candolim Beach. Surrounded by top cafes, supermarkets, and famous shacks like Fisherman's Wharf & Calamari.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
