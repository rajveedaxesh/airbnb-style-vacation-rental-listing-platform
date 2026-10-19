import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import type { HostInfo } from '../../types/listing';

interface ContactHostModalProps {
  isOpen: boolean;
  host: HostInfo;
  onClose: () => void;
}

export const ContactHostModal: React.FC<ContactHostModalProps> = ({
  isOpen,
  host,
  onClose
}) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-label="Contact host modal" aria-modal="true">
      <div className="modal-content-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close-btn" onClick={onClose} aria-label="Close contact modal">
            <X size={18} />
          </button>
          <div style={{ fontWeight: 700, fontSize: '16px' }}>Contact {host.name}</div>
          <div style={{ width: '32px' }} />
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <img src={host.avatar} alt={host.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '18px' }}>Send a message to {host.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Responds {host.responseTime}
              </div>
            </div>
          </div>

          {sent ? (
            <div style={{ padding: '32px', textAlign: 'center', backgroundColor: '#F0FDF4', color: '#15803D', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
              ✓ Message sent to {host.name}! They will get back to you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>
                Your Message
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Mirashya Homes, I have a question about the private Jacuzzi..."
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  marginBottom: '20px'
                }}
              />

              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--text-dark)',
                  color: 'white',
                  padding: '14px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
