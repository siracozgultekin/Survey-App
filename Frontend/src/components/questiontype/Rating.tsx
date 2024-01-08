import { Question } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface RatingProps {
  questionID?: string;
  questions?: Question[];
  setQuestions?: (questions: Question[]) => void;
  InsertRatingAnswer?: (choice: string, questionID: string) => void;
  disabled?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  questionID,
  questions = [],
  setQuestions,
  InsertRatingAnswer,
  disabled,
}) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleRatingClick = (newRating: string, index: number) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
      InsertRatingAnswer && InsertRatingAnswer("5", questionID!);
      return;
    }

    setClickedIndex(index);
    InsertRatingAnswer && InsertRatingAnswer(newRating, questionID!);
  };

  return (
    <div className="flex items-center">
      {Array.from(Array(10).keys()).map((_, index) => (
        <button
          key={index}
          disabled={disabled}
          className={cn(
            "h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:text-white  dark:bg-slate-800 ",
            disabled && "cursor-not-allowed",
            index === 0 &&
              " hover:bg-red-900 dark:hover:bg-red-900 dark:hover:text-white",
            index === 1 &&
              " hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white",
            index === 2 &&
              " hover:bg-orange-800 dark:hover:bg-orange-800 dark:hover:text-white",
            index === 3 &&
              " hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white",
            index === 4 &&
              " hover:bg-orange-400 dark:hover:bg-orange-400 dark:hover:text-white",
            index === 5 &&
              " hover:bg-yellow-500 dark:hover:bg-yellow-500 dark:hover:text-white",
            index === 6 &&
              " hover:bg-yellow-300 dark:hover:bg-yellow-300 dark:hover:text-white",
            index === 7 &&
              " hover:bg-green-400 dark:hover:bg-green-400 dark:hover:text-white",
            index === 8 &&
              " hover:bg-green-500 dark:hover:bg-green-500 dark:hover:text-white",
            index === 9 &&
              " hover:bg-green-700 dark:hover:bg-green-700 dark:hover:text-white",
            clickedIndex === index &&
              index === 0 &&
              " bg-red-900 text-white dark:bg-red-900 dark:text-white",
            clickedIndex === index &&
              index === 1 &&
              " bg-red-600 text-white dark:bg-red-600 dark:text-white",
            clickedIndex === index &&
              index === 2 &&
              " bg-orange-800 text-white dark:bg-orange-800 dark:text-white",
            clickedIndex === index &&
              index === 3 &&
              " bg-orange-600 text-white dark:bg-orange-600 dark:text-white",
            clickedIndex === index &&
              index === 4 &&
              " bg-orange-400 text-white dark:bg-orange-400 dark:text-white",
            clickedIndex === index &&
              index === 5 &&
              " bg-yellow-500 text-white dark:bg-yellow-500 dark:text-white",
            clickedIndex === index &&
              index === 6 &&
              " bg-yellow-300 text-white dark:bg-yellow-300 dark:text-white",
            clickedIndex === index &&
              index === 7 &&
              " bg-green-400 text-white dark:bg-green-400 dark:text-white",
            clickedIndex === index &&
              index === 8 &&
              " bg-green-500 text-white dark:bg-green-500 dark:text-white",
            clickedIndex === index &&
              index === 9 &&
              " bg-green-700 text-white dark:bg-green-700 dark:text-white",
          )}
          onClick={() => handleRatingClick((index + 1).toString(), index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
Rating.defaultProps = {
  questionID: "defaultID",
  questions: [],
  setQuestions: () => {}, // Varsayılan bir fonksiyon
};

export default Rating;
