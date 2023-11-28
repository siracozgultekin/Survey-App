import { Question, Survey } from "@/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
const SurveyAnswer = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/questions/${surveyId}`,
        );
        setQuestions(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/surveys/${surveyId}`,
        );
        setSurvey(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSurvey();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className=" h-[100px] w-[50%] bg-red-400">
        <p className="text-2xl font-semibold text-primary">
          {survey && survey.title}
        </p>
      </div>

      {questions.map((question) => (
        <div
          key={question.id}
          className=" mb-5 flex min-h-[150px] w-[50%] flex-col justify-between rounded-2xl  bg-gray-100 p-3 dark:bg-slate-900"
        >
          <p>{question.question} </p>
          {question.choices.map((choice, index) => (
            <div key={index} className="flex gap-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {choice}
                </label>
              </div>{" "}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SurveyAnswer;
