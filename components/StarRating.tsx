import React from 'react';
import StarIcon from './icons/StarIcon';
import OutlineStarIcon from './icons/OutlineStarIcon';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, className }) => {
  const roundedRating = Math.round(rating);
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return starValue <= roundedRating ? (
          <StarIcon key={index} className="w-4 h-4 text-amber-500" />
        ) : (
          <OutlineStarIcon key={index} className="w-4 h-4 text-slate-300" />
        );
      })}
    </div>
  );
};

export default StarRating;
