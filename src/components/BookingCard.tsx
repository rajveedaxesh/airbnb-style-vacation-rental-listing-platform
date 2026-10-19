import React, { useState } from 'react';
import { Star, ChevronDown, Plus, Minus } from 'lucide-react';

interface BookingCardProps {
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  cleaningFee: number;
  serviceFeeRate: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onOpenCalendar: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  pricePerNight,
  rating,
  reviewsCount,
  cleaningFee,
  serviceFeeRate,
  checkInDate,
  checkOutDate,
  onOpenCalendar
}) => {
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [isReserved, setIsReserved] = useState(false);

  // Calculate nights
  const nights = checkInDate && checkOutDate
    ? Math.max(1, Math.ceil(Math.abs(checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 5;

  const baseTotal = pricePerNight * nights;
  const serviceFee = Math.round(baseTotal * serviceFeeRate);
  const grandTotal = baseTotal + cleaningFee + serviceFee;
  const totalGuests = adults + childrenCount;

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  const handleReserve = () => {
    setIsReserved(true);
    setTimeout(() => setIsReserved(false), 3000);
  };

  return (
    <div className="booking-card-wrapper">
      <div className="booking-card" role="region" aria-label="Booking and pricing calculator">
        <div className="booking-price-row">
          <div>
            <span className="booking-price">${pricePerNight}</span>
            <span className="price-unit"> night</span>
          </div>

          <div className="booking-rating">
            <Star size={14} fill="#222222" stroke="none" />
            <span>{rating.toFixed(2)}</span>
            <span style={{ color: 'var(--text-secondary)' }}>({reviewsCount})</span>
          </div>
        </div>

        <div className="booking-inputs-box">
          <div className="booking-date-inputs">
            <button className="date-input-btn" onClick={onOpenCalendar} aria-label="Select check-in date">
              <span className="input-label">CHECK-IN</span>
              <span className={`input-val ${!checkInDate ? 'placeholder' : ''}`}>
                {formatDate(checkInDate) || '10/5/2026'}
              </span>
            </button>

            <button className="date-input-btn" onClick={onOpenCalendar} aria-label="Select check-out date">
              <span className="input-label">CHECKOUT</span>
              <span className={`input-val ${!checkOutDate ? 'placeholder' : ''}`}>
                {formatDate(checkOutDate) || '10/10/2026'}
              </span>
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <button
              className="guest-input-btn"
              onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
              aria-expanded={isGuestDropdownOpen}
              aria-label="Select guests"
            >
              <div>
                <div className="input-label">GUESTS</div>
                <div className="input-val">
                  {totalGuests} guest{totalGuests > 1 ? 's' : ''}
                  {infants > 0 ? `, ${infants} infant` : ''}
                  {pets > 0 ? `, ${pets} pet` : ''}
                </div>
              </div>
              <ChevronDown
                size={18}
                style={{ transform: isGuestDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              />
            </button>

            {isGuestDropdownOpen && (
              <div className="guest-selector-dropdown">
                <div className="guest-row">
                  <div className="guest-info">
                    <h4>Adults</h4>
                    <p>Age 13+</p>
                  </div>
                  <div className="guest-counter">
                    <button
                      className="counter-btn"
                      disabled={adults <= 1}
                      onClick={() => setAdults(adults - 1)}
                      aria-label="Decrease adults"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{adults}</span>
                    <button
                      className="counter-btn"
                      disabled={adults + childrenCount >= 3}
                      onClick={() => setAdults(adults + 1)}
                      aria-label="Increase adults"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="guest-row">
                  <div className="guest-info">
                    <h4>Children</h4>
                    <p>Ages 2–12</p>
                  </div>
                  <div className="guest-counter">
                    <button
                      className="counter-btn"
                      disabled={childrenCount <= 0}
                      onClick={() => setChildrenCount(childrenCount - 1)}
                      aria-label="Decrease children"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{childrenCount}</span>
                    <button
                      className="counter-btn"
                      disabled={adults + childrenCount >= 3}
                      onClick={() => setChildrenCount(childrenCount + 1)}
                      aria-label="Increase children"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="guest-row">
                  <div className="guest-info">
                    <h4>Infants</h4>
                    <p>Under 2</p>
                  </div>
                  <div className="guest-counter">
                    <button
                      className="counter-btn"
                      disabled={infants <= 0}
                      onClick={() => setInfants(infants - 1)}
                      aria-label="Decrease infants"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{infants}</span>
                    <button
                      className="counter-btn"
                      disabled={infants >= 2}
                      onClick={() => setInfants(infants + 1)}
                      aria-label="Increase infants"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="guest-row">
                  <div className="guest-info">
                    <h4>Pets</h4>
                    <p>Service animals allowed</p>
                  </div>
                  <div className="guest-counter">
                    <button
                      className="counter-btn"
                      disabled={pets <= 0}
                      onClick={() => setPets(pets - 1)}
                      aria-label="Decrease pets"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{pets}</span>
                    <button
                      className="counter-btn"
                      disabled={pets >= 2}
                      onClick={() => setPets(pets + 1)}
                      aria-label="Increase pets"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button
                    style={{ fontSize: '14px', fontWeight: 600, textDecoration: 'underline' }}
                    onClick={() => setIsGuestDropdownOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="reserve-btn" onClick={handleReserve}>
          {isReserved ? '✓ Dates Reserved!' : 'Reserve'}
        </button>

        <div className="reserve-subtext">You won't be charged yet</div>

        <div className="pricing-calculation">
          <div className="calc-row">
            <span className="calc-label">${pricePerNight} × {nights} nights</span>
            <span>${baseTotal}</span>
          </div>

          <div className="calc-row">
            <span className="calc-label">Cleaning fee</span>
            <span>${cleaningFee}</span>
          </div>

          <div className="calc-row">
            <span className="calc-label">Airbnb service fee</span>
            <span>${serviceFee}</span>
          </div>

          <div className="calc-total-row">
            <span>Total before taxes</span>
            <span>${grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
