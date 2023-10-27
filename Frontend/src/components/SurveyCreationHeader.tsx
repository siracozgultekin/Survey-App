import React from "react";
import { Eye, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/app/store";

import {
  setSurveyOwnerId,
  setSurveyCreationDate,
  setSurveyDeadline,
  setSurveyParticipants,
  resetSurvey,
} from "@/redux/features/survey_creation/survey";

const SurveyCreationHeader = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.user.id);
  const titleInput = useSelector((state: RootState) => state.survey.title);
  const survey = useSelector((state: RootState) => state.survey);
  const questionArray = useSelector((state: RootState) => state.questionArray);

  const handlePublish = async () => {
    dispatch(setSurveyOwnerId(userId));

    //DUZGUN SETLEMIOR
    dispatch(setSurveyCreationDate(new Date()));
    dispatch(
      setSurveyDeadline(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // 7 days
    );
    dispatch(setSurveyParticipants([]));

    try {
      const res = await axios.post("http://localhost:5000/survey", {
        dataSent: {
          id: survey.id,
          owner_id: survey.owner_id,
          title: survey.title,
          description: survey.description,
          creation_date: survey.creation_date?.toISOString(),
          deadline: survey.deadline?.toISOString(),
          participants: survey.participants,
          questions: questionArray,
        },
      });

      if (res.status === 200) {
        toast({
          title: "Survey created!",
          description: "Survey created successfully.",
        });
        dispatch(resetSurvey());
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        console.log("err=>", err.response?.data);
        toast({
          title: "Form boş yollanılamaz",
          variant: "destructive",
        });
      } else if (err.response?.status === 500) {
        const { error } = err.response?.data as { error: string };
        toast({
          title: error,
          description:
            "Please check your internet connection and try again later.",
          variant: "destructive",
        });
      }
    }
  };

  // const InsertSurveyandQuestion = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/survey", {
  //       dataSent: {
  //         ...survey,
  //         questions: questionArray,
  //       },
  //     });
  //     console.log("survey and question were inserted");
  //   } catch (error) {
  //     const err = error as AxiosError;
  //     console.log("err=>", err.response?.data);
  //     if (err.response?.status === 400) {
  //       toast({
  //         title: "Form boş yollanılamaz",
  //         description: "2 soru yazmaya mı üşendin aq cocu",
  //         variant: "destructive",
  //       });
  //     } else if (err.response?.status === 500) {
  //       const { error } = err.response?.data as { error: string };
  //       toast({
  //         title: error,
  //         description:
  //           "Please check your internet connection and try again later.",
  //         variant: "destructive",
  //       });
  //     }
  //   }

  //   // console.log("res=>", res);
  // };

  return (
    <div className="flex h-full items-center justify-between border-b-[1px] border-gray-300 px-8">
      <div className="flex items-center">
        <FileText className="h-10 w-10 rounded-lg text-blue-500" />

        <h3 className="w-[400px] font-semibold">{titleInput}</h3>
      </div>
      <div className="flex items-center gap-5">
        <Eye className="h-6 w-6 text-slate-700" />
        <Button
          className="bg-blue-500 text-white"
          onClick={() => {
            handlePublish();
          }}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default SurveyCreationHeader;
