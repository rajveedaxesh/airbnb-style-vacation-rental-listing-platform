import React, { useState } from 'react';
import { X, Copy, Check, Mail } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, title, onClose }) => {
  const [copied, setCopied] = useState(false);

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

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-label="Share listing modal" aria-modal="true">
      <div className="modal-content-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close-btn" onClick={onClose} aria-label="Close share modal">
            <X size={18} />
          </button>
          <div style={{ fontWeight: 700, fontSize: '16px' }}>Share this place</div>
          <div style={{ width: '32px' }} />
        </div>

        <div className="modal-body">
          <div style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>{title}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
            Candolim, Goa, India · 1 bedroom · 1 bed · 1 bath
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <button
              onClick={handleCopy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              {copied ? <Check size={18} color="#008a05" /> : <Copy size={18} />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            <a
              href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl)}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              <Mail size={18} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
