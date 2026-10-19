import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface DescriptionSectionProps {
  description: string;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate description preview
  const previewText = description.substring(0, 320);

  return (
    <div className="description-section">
      <div className="description-content">
        {isExpanded ? description : `${previewText}...`}
      </div>

      <button
        className="show-more-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? 'Show less' : 'Show more'}</span>
        <ChevronRight size={16} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }} />
      </button>
    </div>
  );
};
