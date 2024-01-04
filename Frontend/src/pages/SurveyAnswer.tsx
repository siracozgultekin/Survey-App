import { Answer, Question, Survey, User } from "@/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import ReadOnlyTiptapEditor from "@/components/editor/TiptapReadOnlyEditor";
import Rating from "@/components/questiontype/Rating";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "@/store/use-user-store";
import { toast } from "@/components/ui/use-toast";

const SurveyAnswer = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const { invitationId } = useParams<{ invitationId: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();

  //get user id from store
  const { setUser, user } = useUserStore();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/question/questions/${surveyId}`,
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
          `http://localhost:5000/survey/get-surveys/${surveyId}`,
        );
        setSurvey(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSurvey();
  }, []);
  useEffect(() => {
    //create answers object and asign it to answers for each question
    const newAnswers = questions.map((question: Question) => {
      return {
        id: uuidv4(),
        user_id: user!.id,
        question_id: question.id,
        survey_id: surveyId!,
        answer: [],
      };
    });
    setAnswers(newAnswers);
  }, [questions]);
  const InsertRatingAnswer = (choice: string, questionID: string) => {
    const newAnswers = answers.map((answerobj: Answer) => {
      if (answerobj.question_id === questionID) {
        if (answerobj.answer.includes(choice)) {
          return {
            ...answerobj,
            answer: ["5"],
          };
        }
        return { ...answerobj, answer: [choice] };
      }
      return answerobj;
    });
    setAnswers(newAnswers);
  };
  const InsertMultipleChoiceAnswer = (choice: string, questionID: string) => {
    const newAnswers = answers.map((answerobj: Answer) => {
      if (answerobj.question_id === questionID) {
        if (answerobj.answer.includes(choice)) {
          return {
            ...answerobj,
            answer: answerobj.answer.filter((item) => item !== choice),
          };
        }
        return { ...answerobj, answer: [...answerobj.answer, choice] };
      }
      return answerobj;
    });
    setAnswers(newAnswers);
  };
  const CreateAnswer = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/answer/answers`,
        answers,
      );

      if (res.status == 200) {
        UpdateInvitationState();
        InsertParticipatedSurvey();
        toast({
          title: "Cevabınız başarıyla kaydedildi",
        });
        navigate("/home");
      }
    } catch (error) {
      console.log("createAnswer error=>", error);
      toast({
        title: "Something went wrong",
        description:
          "Please check your internet connection and try again later.",
        variant: "destructive",
      });
    }
  };
  const UpdateInvitationState = async () => {
    try {
      await axios.post(
        `http://localhost:5000/invitation/updateinvitationstate`,
        {
          invitation_id: invitationId,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const InsertParticipatedSurvey = async () => {
    try {
      await axios
        .post(`http://localhost:5000/survey/insertparticipatedsurvey`, {
          survey_id: surveyId as string,
          user_id: user!.id,
        })
        .then(() => {
          //update user store by adding participated survey id

          const newParticipatedSurveys = [
            ...user!.participated_surveys,
            surveyId as string,
          ];
          const newUser = {
            ...(user as User),
            participated_surveys: newParticipatedSurveys,
          };
          setUser(newUser as User);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center">
      {" "}
      <div className=" flex  w-[50%] flex-col gap-2  p-5  font-semibold text-primary">
        <h3 className="self-center text-3xl ">{survey && survey.title}</h3>
        <p className=" text-center text-black dark:text-white">
          {survey && survey.description}
        </p>
      </div>
      {questions.map((question) => (
        <div
          key={question.id}
          className=" mb-5 flex min-h-[150px] w-[50%] flex-col  rounded-2xl  bg-gray-100 p-3 dark:bg-slate-900"
        >
          <ReadOnlyTiptapEditor content={question.question} />
          {question.question_type == "2" ? (
            question.choices.map((choice, index) => (
              <div key={index} className="flex p-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    onClick={() =>
                      InsertMultipleChoiceAnswer(choice, question.id)
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {choice}
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div className="flex  flex-col items-center gap-2 p-3">
              <Rating
                questionID={question.id}
                questions={questions}
                setQuestions={setQuestions}
                InsertRatingAnswer={InsertRatingAnswer}
              />
            </div>
          )}
        </div>
      ))}{" "}
      <Button className="" onClick={CreateAnswer}>
        <span>Submit</span>
      </Button>
    </div>
  );
};

export default SurveyAnswer;
