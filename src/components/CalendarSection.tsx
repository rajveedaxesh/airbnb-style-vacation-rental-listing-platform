import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarSectionProps {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onSelectDates: (checkIn: Date | null, checkOut: Date | null) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  checkInDate,
  checkOutDate,
  onSelectDates
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 9, 1)); // October 2026

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (date: Date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      onSelectDates(date, null);
    } else if (checkInDate && !checkOutDate) {
      if (date < checkInDate) {
        onSelectDates(date, null);
      } else {
        onSelectDates(checkInDate, date);
      }
    }
  };

  const isDateSelected = (date: Date) => {
    if (checkInDate && date.getTime() === checkInDate.getTime()) return 'start';
    if (checkOutDate && date.getTime() === checkOutDate.getTime()) return 'end';
    if (checkInDate && checkOutDate && date > checkInDate && date < checkOutDate) return 'range';
    return null;
  };

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 5;
  };

  const renderMonthGrid = (monthOffset: number) => {
    const targetMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const year = targetMonthDate.getFullYear();
    const month = targetMonthDate.getMonth();
    const daysCount = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const monthName = targetMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    for (let day = 1; day <= daysCount; day++) {
      const dateObj = new Date(year, month, day);
      const selType = isDateSelected(dateObj);
      const isPast = dateObj < new Date(2026, 9, 1);

      days.push(
        <button
          key={`day-${day}`}
          className={`calendar-day-btn ${selType || ''} ${isPast ? 'disabled' : ''}`}
          disabled={isPast}
          onClick={() => handleDateClick(dateObj)}
          aria-label={`${monthName} ${day}`}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="month-grid-wrapper">
        <h3 className="month-name">{monthName}</h3>
        <div className="days-header">
          {daysOfWeek.map((d, idx) => (
            <span key={idx}>{d}</span>
          ))}
        </div>
        <div className="days-grid">{days}</div>
      </div>
    );
  };

  const nights = calculateNights();

  return (
    <div className="calendar-section" id="availability">
      <div className="calendar-header-row">
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 600 }}>
            {checkInDate && checkOutDate ? `${nights} nights in Candolim` : 'Select check-in date'}
          </h2>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {checkInDate && checkOutDate
              ? `${checkInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${checkOutDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
              : 'Add your travel dates for exact pricing'}
          </div>
        </div>

        <div className="calendar-nav-buttons">
          <button
            className="cal-nav-btn"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="cal-nav-btn"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="dual-month-container">
        {renderMonthGrid(0)}
        {renderMonthGrid(1)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <button
          style={{ fontSize: '14px', fontWeight: 600, textDecoration: 'underline' }}
          onClick={() => onSelectDates(null, null)}
        >
          Clear dates
        </button>
      </div>

      <style>{`
        .calendar-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        .calendar-nav-buttons {
          display: flex;
          gap: 8px;
        }
        .cal-nav-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-light);
          transition: background 0.2s;
        }
        .cal-nav-btn:hover {
          background-color: var(--bg-secondary);
        }
        .dual-month-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        .month-name {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          text-align: center;
        }
        .days-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }
        .calendar-day-btn {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          border-radius: 50%;
          transition: all 0.15s ease;
        }
        .calendar-day-btn:hover:not(.disabled) {
          border: 1px solid var(--text-dark);
        }
        .calendar-day-btn.start, .calendar-day-btn.end {
          background-color: var(--text-dark);
          color: white;
        }
        .calendar-day-btn.range {
          background-color: var(--bg-secondary);
          border-radius: 0;
        }
        .calendar-day-btn.disabled {
          opacity: 0.3;
          text-decoration: line-through;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};
