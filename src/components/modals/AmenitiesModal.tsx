import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import type { AmenityItem } from '../../types/listing';

interface AmenitiesModalProps {
  isOpen: boolean;
  amenities: AmenityItem[];
  onClose: () => void;
}

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({
  isOpen,
  amenities,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAmenities = amenities.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(amenities.map((a) => a.category)));

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-label="All amenities modal" aria-modal="true">
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close-btn" onClick={onClose} aria-label="Close amenities modal">
            <X size={18} />
          </button>
          <div style={{ fontWeight: 700, fontSize: '16px' }}>What this place offers</div>
          <div style={{ width: '32px' }} />
        </div>

        <div className="modal-body">
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search amenities"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-light)',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          {categories.map((cat) => {
            const catItems = filteredAmenities.filter((a) => a.category === cat);
            if (catItems.length === 0) return null;

            return (
              <div key={cat} style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>{cat}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {catItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '16px' }}>{item.name}</div>
                        {item.description && (
                          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
