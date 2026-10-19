import React from 'react';
import { Star } from 'lucide-react';
import type { ReviewItem } from '../types/listing';

interface ReviewsSectionProps {
  rating: number;
  reviewsCount: number;
  categoryRatings: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
  reviews: ReviewItem[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating,
  reviewsCount,
  categoryRatings,
  reviews
}) => {
  const categories = [
    { label: 'Cleanliness', score: categoryRatings.cleanliness },
    { label: 'Accuracy', score: categoryRatings.accuracy },
    { label: 'Communication', score: categoryRatings.communication },
    { label: 'Location', score: categoryRatings.location },
    { label: 'Check-in', score: categoryRatings.checkIn },
    { label: 'Value', score: categoryRatings.value }
  ];

  return (
    <div className="reviews-section" id="reviews">
      <h2>
        <Star size={20} fill="#222222" stroke="none" />
        <span>{rating.toFixed(2)} · {reviewsCount} reviews</span>
      </h2>

      <div className="category-ratings-grid">
        {categories.map((cat, idx) => (
          <div key={idx} className="category-rating-item">
            <span>{cat.label}</span>
            <div className="rating-bar-wrapper">
              <div className="rating-bar">
                <div
                  className="rating-fill"
                  style={{ width: `${(cat.score / 5.0) * 100}%` }}
                />
              </div>
              <span style={{ fontWeight: 600, fontSize: '12px' }}>{cat.score.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="reviews-grid">
        {reviews.map((r) => (
          <div key={r.id} className="review-card">
            <div className="reviewer-header">
              <img src={r.avatar} alt={r.author} className="reviewer-avatar" />
              <div>
                <div className="reviewer-name">{r.author}</div>
                <div className="reviewer-sub">{r.date} · {r.userDuration}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(r.rating)].map((_, i) => (
                <Star key={i} size={12} fill="#222222" stroke="none" />
              ))}
            </div>

            <p className="review-comment">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
