import React from 'react';
import { StarRating } from '../common/StarRating';
import { StarIcon, CheckIcon } from '../common/Icons';
import { ProductReview } from '@/types/product';
import { MOCK_REVIEWS } from '@/data/products';

interface ProductReviewsProps {
  rating: number;
  reviewsCount: number;
  reviews?: ProductReview[];
}

export function ProductReviews({ rating, reviewsCount, reviews = MOCK_REVIEWS }: ProductReviewsProps) {
  // Star distribution breakdown calculation
  const distribution = [
    { stars: 5, percentage: 78, count: Math.round(reviewsCount * 0.78) },
    { stars: 4, percentage: 16, count: Math.round(reviewsCount * 0.16) },
    { stars: 3, percentage: 4, count: Math.round(reviewsCount * 0.04) },
    { stars: 2, percentage: 1, count: Math.round(reviewsCount * 0.01) },
    { stars: 1, percentage: 1, count: Math.round(reviewsCount * 0.01) },
  ];

  return (
    <div className="space-y-8">
      {/* Header and summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-3xl border border-stone-200/80">
        
        {/* Overall Rating Score */}
        <div className="flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-l border-stone-100">
          <span className="text-4xl font-extrabold text-stone-900 mb-1">{rating.toFixed(1)}</span>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <StarIcon key={s} size={18} filled={s <= Math.round(rating)} />
            ))}
          </div>
          <span className="text-xs text-stone-500 font-medium">بناءً على {reviewsCount} تقييم حقيقي</span>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="md:col-span-2 space-y-2.5 flex flex-col justify-center">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 w-12 text-stone-600 font-medium">
                <span>{item.stars}</span>
                <StarIcon size={12} filled />
              </div>
              <div className="flex-1 bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-10 text-left text-stone-400 text-[11px]">{item.count}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-stone-900">أحدث آراء العملاء</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-white rounded-2xl border border-stone-200/70 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-800">{rev.userName}</span>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                        <CheckIcon size={10} />
                        مشترٍ موثق
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} size={13} filled={s <= rev.rating} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
