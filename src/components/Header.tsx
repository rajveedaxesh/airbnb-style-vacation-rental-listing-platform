import React from 'react';
import { Search, Globe, Menu, User } from 'lucide-react';

interface HeaderProps {
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  return (
    <header className="header" role="banner">
      {/* Brand Logo */}
      <a href="#" className="header-logo" aria-label="Airbnb Homepage">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="currentcolor"
          style={{ display: 'block' }}
        >
          <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.408-3.6 8-8 8-2.673 0-5.116-1.318-6.6-3.351L16 27.5l-1.1 1.338C13.416 30.882 10.973 32 8.3 32 3.9 32 .3 28.408.3 24c0-.987.234-1.854.81-3.236l.245-.544c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C10.27 1.963 11.725 1 13.733 1H16zm0 2h-2.267c-1.34 0-2.31.64-3.275 2.373l-.427.822c-1.88 3.684-5.96 12.247-6.918 14.475l-.21.467c-.506 1.16-.69 1.83-.726 2.502l-.007.236c0 3.314 2.686 6 6 6 2.052 0 3.92-.98 5.127-2.553L16 24.5l2.4 3.022C19.607 29.02 21.475 30 23.527 30c3.314 0 6-2.686 6-6 0-.74-.183-1.42-.693-2.623l-.123-.298c-.958-2.228-5.038-10.79-6.918-14.475l-.427-.822C20.31 3.64 19.34 3 18 3h-2z"></path>
        </svg>
        <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>airbnb</span>
      </a>

      {/* Search Pill */}
      <button
        className="search-bar-pill"
        onClick={onSearchClick}
        aria-label="Search destination, dates, and guests"
      >
        <span className="search-pill-item">Candolim, Goa</span>
        <span className="search-pill-item">Any week</span>
        <span className="search-pill-item">Add guests</span>
        <div className="search-icon-btn" aria-hidden="true">
          <Search size={14} strokeWidth={3} />
        </div>
      </button>

      {/* User Actions */}
      <div className="user-menu">
        <a href="#" className="host-link">Airbnb your home</a>
        <button className="globe-btn" aria-label="Choose a language and currency">
          <Globe size={16} />
        </button>

        <button className="user-pill" aria-label="Main navigation menu">
          <Menu size={16} />
          <div className="user-avatar" aria-hidden="true">
            <User size={18} />
          </div>
        </button>
      </div>
    </header>
  );
};
