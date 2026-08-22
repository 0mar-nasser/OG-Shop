import React from 'react';
import { StarIcon } from './Icons';

interface StarRatingProps {
  rating: number;
  reviewsCount?: number;
  size?: number;
  showCount?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  reviewsCount,
  size = 14,
  showCount = true,
  className = ''
}: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            size={size}
            filled={star <= Math.round(rating)}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-stone-700">{rating.toFixed(1)}</span>
      {showCount && reviewsCount !== undefined && (
        <span className="text-xs text-stone-400">({reviewsCount})</span>
      )}
    </div>
  );
}
