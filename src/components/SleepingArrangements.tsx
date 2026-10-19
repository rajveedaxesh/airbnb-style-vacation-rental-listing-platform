import React from 'react';
import { Bed } from 'lucide-react';

export const SleepingArrangements: React.FC = () => {
  return (
    <div className="sleeping-section">
      <h2>Where you'll sleep</h2>
      <div className="sleeping-card">
        <Bed size={28} color="#222222" />
        <div>
          <div className="sleeping-card-title">Bedroom 1</div>
          <div className="sleeping-card-subtitle">1 queen bed</div>
        </div>
      </div>
    </div>
  );
};
