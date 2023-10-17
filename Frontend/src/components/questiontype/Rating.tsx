import React, { useState } from "react";

function Rating() {
  const [rating, setRating] = useState<number>(1);

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: 10 }).map((_, index) => {
        const ratingValue = index + 1;
        const isHighlighted = ratingValue <= rating;

        const circleClasses = `rounded-full bg-white w-8 h-8 flex items-center justify-center mr-2 hover:bg-yellow-200 transition-colors ${
          isHighlighted ? "bg-green-500" : "bg-red-500"
        }`;

        return (
          <div
            key={ratingValue}
            className={circleClasses}
            onClick={() => handleRatingClick(ratingValue)}
          >
            {ratingValue}
          </div>
        );
      })}
    </div>
  );
}

export default Rating;
