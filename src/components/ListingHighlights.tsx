import React from 'react';
import { Trophy, Sparkles, Key, Calendar } from 'lucide-react';

interface Highlight {
  icon: string;
  title: string;
  subtitle: string;
}

interface ListingHighlightsProps {
  highlights: Highlight[];
}

export const ListingHighlights: React.FC<ListingHighlightsProps> = ({ highlights }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
      case 'Trophy':
        return <Trophy size={24} className="highlight-icon" />;
      case 'Sparkles':
        return <Sparkles size={24} className="highlight-icon" />;
      case 'Key':
        return <Key size={24} className="highlight-icon" />;
      case 'Calendar':
      default:
        return <Calendar size={24} className="highlight-icon" />;
    }
  };

  return (
    <div className="highlights-list">
      {highlights.map((h, i) => (
        <div key={i} className="highlight-item">
          {renderIcon(h.icon)}
          <div className="highlight-text">
            <h3>{h.title}</h3>
            <p>{h.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
