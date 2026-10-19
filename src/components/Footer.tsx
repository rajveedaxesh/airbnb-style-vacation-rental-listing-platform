import React from 'react';
import { Globe, DollarSign } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-container" role="contentinfo">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Centre</a></li>
              <li><a href="#">AirCover</a></li>
              <li><a href="#">Anti-discrimination</a></li>
              <li><a href="#">Disability support</a></li>
              <li><a href="#">Cancellation options</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Hosting</h4>
            <ul>
              <li><a href="#">Airbnb your home</a></li>
              <li><a href="#">AirCover for Hosts</a></li>
              <li><a href="#">Hosting resources</a></li>
              <li><a href="#">Community forum</a></li>
              <li><a href="#">Hosting responsibly</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Airbnb</h4>
            <ul>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">New features</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Emergency stays</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            <span>© 2026 Airbnb Clone, Inc.</span>
            <span>·</span>
            <a href="#">Privacy</a>
            <span>·</span>
            <a href="#">Terms</a>
            <span>·</span>
            <a href="#">Sitemap</a>
            <span>·</span>
            <a href="#">Company details</a>
          </div>

          <div className="footer-settings">
            <button className="footer-setting-btn">
              <Globe size={16} />
              <span>English (US)</span>
            </button>

            <button className="footer-setting-btn">
              <DollarSign size={16} />
              <span>USD</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer-container {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          margin-top: 64px;
          padding: 48px 0 24px 0;
          font-size: 14px;
        }
        .footer-content {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--border-light);
        }
        .footer-column h4 {
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--text-dark);
        }
        .footer-column ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-column a:hover {
          text-decoration: underline;
        }
        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          color: var(--text-dark);
        }
        .footer-copyright {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .footer-settings {
          display: flex;
          gap: 16px;
        }
        .footer-setting-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }
      `}</style>
    </footer>
  );
};
