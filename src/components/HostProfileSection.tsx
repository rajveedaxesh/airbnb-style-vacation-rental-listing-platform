import React from 'react';
import { ShieldCheck, Trophy, MessageSquare } from 'lucide-react';
import type { HostInfo } from '../types/listing';

interface HostProfileSectionProps {
  host: HostInfo;
  onOpenContactModal: () => void;
}

export const HostProfileSection: React.FC<HostProfileSectionProps> = ({
  host,
  onOpenContactModal
}) => {
  return (
    <div className="host-profile-section" id="host">
      <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '24px' }}>
        Hosted by {host.name}
      </h2>

      <div className="host-profile-card">
        <div className="host-profile-left">
          <div className="host-profile-avatar-box">
            <img src={host.avatar} alt={host.name} className="host-profile-img" />
            <div className="host-profile-name">{host.name}</div>
            <div className="host-profile-joined">{host.joinedDate}</div>
          </div>

          <div className="host-stats-row">
            <div className="host-stat-item">
              <div className="stat-num">{host.reviewsCount}</div>
              <div className="stat-label">Reviews</div>
            </div>

            <div className="host-stat-item border-left">
              <div className="stat-num">{host.rating.toFixed(2)} ★</div>
              <div className="stat-label">Rating</div>
            </div>

            <div className="host-stat-item border-left">
              <div className="stat-num">3</div>
              <div className="stat-label">Years hosting</div>
            </div>
          </div>
        </div>

        <div className="host-profile-right">
          <div className="host-detail-row">
            <Trophy size={20} />
            <div>
              <div className="detail-title">{host.name} is a Superhost</div>
              <div className="detail-sub">
                Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
              </div>
            </div>
          </div>

          <div className="host-detail-row">
            <ShieldCheck size={20} />
            <div>
              <div className="detail-title">Co-hosts</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                {host.coHosts?.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                    <img src={c.avatar} alt={c.name} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="host-bio-text">{host.bio}</div>

          <div className="host-response-metrics">
            <div>Response rate: <strong>{host.responseRate}</strong></div>
            <div>Responds <strong>{host.responseTime}</strong></div>
          </div>

          <button className="contact-host-btn" onClick={onOpenContactModal}>
            <MessageSquare size={16} />
            <span>Contact Host</span>
          </button>
        </div>
      </div>

      <style>{`
        .host-profile-card {
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 32px;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 48px;
          background: var(--bg-secondary);
        }
        .host-profile-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: white;
          padding: 24px;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        .host-profile-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 12px;
        }
        .host-profile-name {
          font-size: 20px;
          font-weight: 700;
        }
        .host-profile-joined {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
        .host-stats-row {
          display: flex;
          width: 100%;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .host-stat-item {
          text-align: center;
          flex: 1;
        }
        .host-stat-item.border-left {
          border-left: 1px solid var(--border-subtle);
        }
        .stat-num {
          font-size: 16px;
          font-weight: 700;
        }
        .stat-label {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .host-profile-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .host-detail-row {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .detail-title {
          font-weight: 600;
          font-size: 16px;
        }
        .detail-sub {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .host-bio-text {
          font-size: 15px;
          line-height: 1.5;
          color: var(--text-dark);
        }
        .host-response-metrics {
          font-size: 14px;
          color: var(--text-dark);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .contact-host-btn {
          align-self: flex-start;
          border: 1px solid var(--text-dark);
          background: white;
          padding: 12px 24px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.2s;
        }
        .contact-host-btn:hover {
          background-color: var(--bg-secondary);
        }
      `}</style>
    </div>
  );
};
