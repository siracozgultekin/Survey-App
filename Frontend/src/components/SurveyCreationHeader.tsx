import { Eye, FileText, Ghost, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import axios, { AxiosError } from "axios";
import { useSurveyStore } from "@/store/use-survey-store";
import { useUserStore } from "@/store/use-user-store";
import { useQuestionArrStore } from "@/store/use-questionArr-store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    <div className=" flex h-full items-center justify-between border-b bg-white px-8 dark:bg-slate-950">
      <div className="flex items-center">
        {/* <FileText className="h-10 w-10 rounded-lg text-blue-500" /> */}

        {/* <h3 className="w-[400px] font-semibold">{surveyStore.title}</h3> */}
        <h3 className="w-[400px] font-semibold">*Şablon Tipi*</h3>
      </div>
      <div className="flex items-center gap-5">
        <div className=" px-4 ">
          <Sheet>
            <SheetTrigger className="flex gap-1">
              <Mail /> Davet Edilenler
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Ankete Davet Et </SheetTitle>
                <SheetDescription>
                  Ankete davet etmek istediğin kişileri seç.
                </SheetDescription>
                <div></div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <Button
          className="bg-blue-500 text-white"
          onClick={() => {
            handlePublish();
          }}
        >
          Yayınla
        </Button>
      </div>
    </div>
  );
};

export default SurveyCreationHeader;
