import React, { useState } from "react";
import { Button } from "../ui/button";

function Rating() {
  const [rating, setRating] = useState<number>(1);

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          className="
        h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:bg-yellow-500 hover:text-white"
        >
          {num}
        </button>
      ))}
    </div>
  );
}

export default Rating;
