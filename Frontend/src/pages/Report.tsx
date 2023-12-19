import { ExtendedQuestion } from "@/interfaces";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {};

const Report = (props: Props) => {
  const token = Cookies.get("token");
  let [searchParams] = useSearchParams();
  const survey_id = searchParams.get("surveyid") ?? "0";

  const [extendedQuestions, setExtendedQuestions] = useState<
    ExtendedQuestion[]
  >([]);
  useEffect(() => {
    const GetAllQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getallquestions/${survey_id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );
        console.log("response.data =>", response.data);
        setExtendedQuestions(response.data);
        // setQuestions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetAllQuestions();

    return () => {};
  }, [survey_id]);
  // const GetAllAnswers = async (question_id: string) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/getallanswers/${question_id}`,
  //       {
  //         headers: {
  //           Authorization: `${token}`,
  //         },
  //       },
  //     );
  //     console.log("response.data =>", response.data);
  //     setAnswers(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="bg-green-700 text-center">
      {/* {questions.map((question) => {
        // GetAllAnswers(question.id);
        return (
          <div className="text-2xl text-white" key={question.id}>
            {question.question}
          </div>
        );
      })} */}

      {extendedQuestions.map((question) => {
        return (
          <div className="text-2xl text-white" key={question.id}>
            {question.question}

            {question.answers.map((answer) => {
              return (
                <div className="text-white" key={answer.id}>
                  {answer.answer}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Report;
