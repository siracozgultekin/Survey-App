import { ExtendedQuestion, Survey } from "@/interfaces";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReadOnlyTiptapEditor from "@/components/editor/TiptapReadOnlyEditor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

const customLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex flex-col">
      {payload.map((entry: any, index: number) => (
        <div className="flex items-center gap-2" key={`item-${index}`}>
          <Rectangle width={20} height={20} fill={entry.color} />
          <span className="text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const customTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div className="rounded-md bg-muted px-4 py-2">
        <p className="font-bold">{label}</p>
        <p className="text-sm">
          {payload && payload[0].name}: {payload && payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

const Report = () => {
  const token = Cookies.get("token");
  let [searchParams] = useSearchParams();
  const survey_id = searchParams.get("surveyid") ?? "0";
  const [survey, setSurvey] = useState<Survey>();
  const [extendedQuestions, setExtendedQuestions] = useState<
    ExtendedQuestion[]
  >([]);
  const [invitedUsersNameSurname, setInvitedUsersNameSurname] = useState<
    String[]
  >([]);
  const navigate = useNavigate();
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
          `http://localhost:5000/question/questions-with-their-answers/${survey_id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );

        const survey = await axios.get(
          `http://localhost:5000/survey/get-surveys/${survey_id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );

        setExtendedQuestions(response.data);
        setSurvey(survey.data);
        // setQuestions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const GetInvitedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/invitation/get-invited-users/${survey_id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );
        console.log(response.data);
        setInvitedUsersNameSurname(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetAllQuestionsAndSurvey();
    GetInvitedUsers();
    return () => {};
  }, [survey_id]);
  const DeleteHandler = async () => {
    try {
      await axios.post(
        `http://localhost:5000/survey/delete-survey-and-invitations`,
        { survey_id },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      toast({
        title: "Silindi!",
        description: "Anket başarıyla silindi",
      });
      setTimeout(() => {
        navigate("/home");
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  flex-col items-center  p-5 text-center ">
      <Tabs
        defaultValue="account"
        className="flex h-[500px] w-[90%]  border bg-gray-100 dark:bg-slate-900 "
      >
        <TabsList className="flex  h-full flex-col self-center border ">
          <ScrollArea className="flex h-full flex-col">
            <div className="flex  flex-col content-center items-center  justify-center  text-center">
              {extendedQuestions.map((question) => {
                return (
                  <TabsTrigger
                    value={question.id}
                    key={question.id}
                    className="text-white "
                  >
                    <ReadOnlyTiptapEditor content={question.question} />
                  </TabsTrigger>
                );
              })}
            </div>
          </ScrollArea>
        </TabsList>{" "}
        {extendedQuestions.map((question) => {
          if (question.question_type === "2") {
            return (
              <TabsContent
                value={question.id}
                key={question.id}
                className="w-full p-10"
              >
                <div
                  className="h-full w-[100%]  bg-gray-200 p-5 text-black dark:bg-slate-800  dark:text-white"
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
                      className=" "
                    >
                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="choice" interval={0} />

                      <YAxis />
                      <Tooltip content={customTooltip} />
                      <Legend content={customLegend} />
                      <Bar dataKey="count" name="Toplam" fill="#1125bf" />
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
                  className="h-full w-[100%] bg-gray-200 p-5 text-black  dark:bg-slate-800  dark:text-white"
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
      <div className="flex w-[90%]  content-between justify-between gap-4  pt-3">
        <div className=" flex w-[45%] flex-col gap-3  ">
          <h1 className=" text-start text-lg font-bold underline">
            Anket Bilgileri
          </h1>
          <div className="flex gap-2">
            <h3 className="font-semibold">Başlığı:</h3>
            <p>{survey?.title}</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="truncate font-semibold">Açıklama:</h3>
            <p className="flex flex-col text-start">
              {survey?.description}
              {survey?.description}
            </p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Katılımcı Sayısı:</h3>
            <p>{survey?.participants.length}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold"> Oluşturulma Tarihi:</h3>
            <p>{formatDate(survey?.creation_date)}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Bitiş Tarihi:</h3>
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
            <DialogContent className="bg-gray-100 dark:bg-slate-900">
              <DialogHeader>
                <DialogTitle>Anketi Silme İşlemi</DialogTitle>
                <DialogDescription className="flex flex-col ">
                  Bu anketi kalıcı olarak silmek istediğine emin misin?{" "}
                  <strong>Unutma! </strong>
                  Gerçek vedalar yalnızca 1 kez yapılır.
                  <Button
                    variant="destructive"
                    className="w-fit self-center"
                    onClick={DeleteHandler}
                  >
                    Sil
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className=" h-[300px] w-[45%] ">
          <h1 className=" text-start text-lg font-bold underline">
            Davet Edilenler
          </h1>
          <ScrollArea className="flex flex-col border ">
            <div className="flex h-[310px] flex-col content-center items-center  justify-center  gap-3 text-center">
              {invitedUsersNameSurname.map((user, i) => (
                <div className="flex" key={i}>
                  <p>{user}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Report;
