import { ExtendedQuestion, Survey } from "@/interfaces";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReadOnlyTiptapEditor from "@/components/editor/TiptapReadOnlyEditor";
type Props = {};

const Report = (props: Props) => {
  const token = Cookies.get("token");
  let [searchParams] = useSearchParams();
  const survey_id = searchParams.get("surveyid") ?? "0";
  const [survey, setSurvey] = useState<Survey>();
  const [extendedQuestions, setExtendedQuestions] = useState<
    ExtendedQuestion[]
  >([]);
  function formatDate(date: Date | undefined | null) {
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString(); // You can customize the date format as needed
      return formattedDate;
    }
    return "N/A"; // Handle cases where the date is not available
  }
  useEffect(() => {
    const GetAllQuestionsAndSurvey = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getallquestions/${survey_id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );

        const survey = await axios.get(
          `http://localhost:5000/surveys/${survey_id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );
        console.log("survey.data =>", survey.data);
        console.log("response.data =>", response.data);
        setExtendedQuestions(response.data);
        setSurvey(survey.data);
        // setQuestions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetAllQuestionsAndSurvey();

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
    <div className="flex  flex-col items-center  p-5 text-center ">
      {/* {questions.map((question) => {
        // GetAllAnswers(question.id);
        return (
          <div className="text-2xl text-white" key={question.id}>
            {question.question}
          </div>
        );
      })} */}
      <Tabs
        defaultValue="account"
        className="flex h-[500px] w-[90%]  border bg-slate-900 "
      >
        <TabsList className="flex  h-full flex-col self-center border ">
          {/* <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger> */}
          {extendedQuestions.map((question) => {
            return (
              <TabsTrigger
                value={question.id}
                key={question.id}
                className="text-white"
              >
                <ReadOnlyTiptapEditor content={question.question} />
              </TabsTrigger>
            );
          })}
        </TabsList>{" "}
        {/* <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
        {extendedQuestions.map((question) => {
          if (question.question_type === "2") {
            return (
              <TabsContent
                value={question.id}
                key={question.id}
                className="w-full p-10"
              >
                <div
                  className="h-full w-[100%]  p-5 text-black dark:bg-slate-800 dark:text-white"
                  key={question.id}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={question.choicesWithCounts}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="choice" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Toplam" fill="#1134d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            );
          } else if (question.question_type === "3") {
            return (
              <TabsContent
                value={question.id}
                key={question.id}
                className="w-full p-10"
              >
                <div
                  className="h-full w-[100%] bg-gray-100 p-5 text-black  dark:bg-slate-800  dark:text-white"
                  key={question.id}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={question.choicesWithCounts}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="choice" color="black" />
                      <YAxis domain={[0, 10]} tickCount={11} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Ortalama" fill="#1134d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            );
          }
        })}
      </Tabs>
      {/* <div className="grid grid-cols-3 gap-14">
        {extendedQuestions.map((question) => {
          switch (question?.question_type) {
            case "2":
              return (
                <div
                  className="h-[300px] w-[70%] bg-gray-100 text-black dark:bg-slate-900 dark:text-white"
                  key={question.id}
                >
                  soru: {question.question}{" "}
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={question.choicesWithCounts}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="choice" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="d" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              );
            case "3":
              return (
                <div
                  className="h-[350px] w-[70%] bg-gray-100 text-black dark:bg-slate-900 dark:text-white"
                  key={question.id}
                >
                  soru: {question.question}{" "}
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={question.choicesWithCounts}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="choice" />
                      <YAxis domain={[0, 10]} tickCount={11} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Average" fill="#4484d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              );
          }
        })}
      </div> */}
      <div className="flex w-[90%] flex-col gap-4 pt-3 ">
        <h1 className=" text-start text-lg font-bold underline">
          Anket Bilgileri
        </h1>
        <div className="flex gap-2">
          <h3 className="font-semibold">Anketin Başlığı:</h3>
          <p>{survey?.title}</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-semibold">Anketin Açıklaması:</h3>
          <p> {survey?.description}</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-semibold">Katılımcı Sayısı:</h3>
          <p>{survey?.participants.length}</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-semibold">Anketin Oluşturulma Tarihi:</h3>
          <p>{formatDate(survey?.creation_date)}</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-semibold">Anketin Bitiş Tarihi:</h3>
          <p>{formatDate(survey?.deadline)}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-fit justify-start gap-3  text-base"
              variant="destructive"
            >
              Anketi Sil
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Anketi Silme</DialogTitle>
              <DialogDescription className="flex flex-col">
                <p>
                  Bu anketi kalıcı olarak silmek istediğine emin misin?{" "}
                  <strong>Unutma! </strong>
                  Gerçek vedalar yalnızca 1 kez yapılır.
                </p>
                <Button variant="destructive" className="w-fit self-center">
                  Sil
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Report;
