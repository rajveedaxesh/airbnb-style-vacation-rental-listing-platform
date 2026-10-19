import React from 'react';
import {
  Sparkles,
  Waves,
  Wifi,
  Utensils,
  Car,
  Tv,
  Wind,
  Laptop,
  Shirt,
  Sun,
  Shield,
  Zap,
  Coffee,
  Check
} from 'lucide-react';
import type { AmenityItem } from '../types/listing';

interface AmenitiesSectionProps {
  amenities: AmenityItem[];
  onOpenAmenitiesModal: () => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  amenities,
  onOpenAmenitiesModal
}) => {
  const renderAmenityIcon = (name: string) => {
    const iconProps = { size: 24, color: '#222222' };
    if (name.includes('Jacuzzi') || name.includes('Hot Tub')) return <Sparkles {...iconProps} />;
    if (name.includes('Pool')) return <Waves {...iconProps} />;
    if (name.includes('Wi-Fi')) return <Wifi {...iconProps} />;
    if (name.includes('Kitchen')) return <Utensils {...iconProps} />;
    if (name.includes('Parking')) return <Car {...iconProps} />;
    if (name.includes('TV')) return <Tv {...iconProps} />;
    if (name.includes('Conditioning')) return <Wind {...iconProps} />;
    if (name.includes('Workspace')) return <Laptop {...iconProps} />;
    if (name.includes('Washing')) return <Shirt {...iconProps} />;
    if (name.includes('Balcony') || name.includes('Patio')) return <Sun {...iconProps} />;
    if (name.includes('Security') || name.includes('First Aid')) return <Shield {...iconProps} />;
    if (name.includes('Power')) return <Zap {...iconProps} />;
    if (name.includes('Coffee')) return <Coffee {...iconProps} />;
    return <Check {...iconProps} />;
  };

  const featured = amenities.slice(0, 10);

  return (
    <div className="amenities-section" id="amenities">
      <h2>What this place offers</h2>
      <div className="amenities-grid">
        {featured.map((amenity) => (
          <div key={amenity.id} className="amenity-row">
            {renderAmenityIcon(amenity.name)}
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>

      <button className="show-all-amenities-btn" onClick={onOpenAmenitiesModal}>
        Show all 32 amenities
      </button>
    </div>
  );
};
