import { Question } from "@/interfaces";

interface RatingProps {
  questionID?: string;
  questions?: Question[];
  setQuestions?: (questions: Question[]) => void;
  InsertRatingAnswer?: (choice: string, questionID: string) => void;
}

const Rating: React.FC<RatingProps> = ({
  questionID,
  questions = [],
  setQuestions,
  InsertRatingAnswer,
}) => {
  const handleRatingClick = (newRating: string) => {
    InsertRatingAnswer && InsertRatingAnswer(newRating, questionID!);
  };

  return (
    <div className="flex items-center">
      <button
        className={`
        h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200
        text-[80%] hover:bg-red-900 hover:text-white  dark:bg-slate-800  dark:hover:bg-red-900`}
        onClick={() => handleRatingClick("1")}
      >
        1
      </button>
      <button
        className="
     h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:bg-red-600 hover:text-white dark:bg-slate-800 dark:hover:bg-red-600"
        onClick={() => handleRatingClick("2")}
      >
        2
      </button>

      <button
        className="
      h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:bg-orange-800 hover:text-white dark:bg-slate-800 dark:hover:bg-orange-800"
        onClick={() => handleRatingClick("3")}
      >
        3
      </button>
      <button
        className="
      h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:bg-orange-600 hover:text-white dark:bg-slate-800 dark:hover:bg-orange-600"
        onClick={() => handleRatingClick("4")}
      >
        4
      </button>
      <button
        className="
      h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:bg-orange-400 hover:text-white dark:bg-slate-800 dark:hover:bg-orange-400"
        onClick={() => handleRatingClick("5")}
      >
        5
      </button>
      <button
        className="
      h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:bg-yellow-500 hover:text-white dark:bg-slate-800 dark:hover:bg-yellow-500"
        onClick={() => handleRatingClick("6")}
      >
        6
      </button>
      <button
        className="
      h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:bg-yellow-300 hover:text-white dark:bg-slate-800 dark:hover:bg-yellow-300"
        onClick={() => handleRatingClick("7")}
      >
        7
      </button>
      <button
        className="
      h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:bg-green-400 hover:text-white dark:bg-slate-800 dark:hover:bg-green-400"
        onClick={() => handleRatingClick("8")}
      >
        8
      </button>
      <button
        className="
      h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:bg-green-500 hover:text-white dark:bg-slate-800 dark:hover:bg-green-500"
        onClick={() => handleRatingClick("9")}
      >
        9
      </button>
      <button
        className="
      h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-200 text-[80%] hover:bg-green-700 hover:text-white dark:bg-slate-800 dark:hover:bg-green-700"
        onClick={() => handleRatingClick("10")}
      >
        10
      </button>
    </div>
  );
};
Rating.defaultProps = {
  questionID: "defaultID",
  questions: [],
  setQuestions: () => {}, // Varsayılan bir fonksiyon
};

export default Rating;
