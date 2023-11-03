import { Eye, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import axios, { AxiosError } from "axios";
import { useSurveyStore } from "@/store/use-survey-store";
import { useUserStore } from "@/store/use-user-store";
import { useQuestionArrStore } from "@/store/use-questionArr-store";

const SurveyCreationHeader = () => {
  const surveyStore = useSurveyStore();
  const { user } = useUserStore();
  const { questionArr } = useQuestionArrStore();

  const handlePublish = async () => {
    const dataSent = {
      id: surveyStore.id,
      owner_id: user?.id,
      title: surveyStore.title,
      description: surveyStore.description,
      creation_date: surveyStore.creation_date,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      participants: [],
      questions: questionArr,
    };

    try {
      const res = await axios.post("http://localhost:5000/survey", {
        //dataSent is equal to: { ...survey, questions: questionArray },
        dataSent,
      });

      if (res.status === 200) {
        toast({
          title: "Survey created!",
          description: "Survey created successfully.",
        });
        surveyStore.resetsurveyStore();
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

  return (
    <div className="flex h-full items-center justify-between border-b-[1px] border-gray-300 px-8">
      <div className="flex items-center">
        <FileText className="h-10 w-10 rounded-lg text-blue-500" />

        <h3 className="w-[400px] font-semibold">{surveyStore.title}</h3>
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
