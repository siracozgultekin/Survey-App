import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import MultipleChoice from "./questiontype/MultipleChoice";
import Rating from "./questiontype/Rating";
import { Circle, CircleDot, Star, Trash2, X } from "lucide-react";
import TiptapEditor from "./editor/TiptapEditor";
import { convert } from "html-to-text";
import { useToast } from "@/components/ui/use-toast";
import { useSurveyStore } from "@/store/use-survey-store";
import { useQuestionArrStore } from "@/store/use-questionArr-store";
import { Button } from "./ui/button";

type Props = {
  type: string;
};

const SurveyCreationBody = ({ type }: Props) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 3);
  const [dropdownMenuTitle, setdropdownMenuTitle] = useState("Çoktan Seçmeli");
  const [questionType, setQuestionType] = useState<number>(2);
  const [choices, setChoices] = useState([""]);
  const [rate, setRate] = useState<string>("0");
  const { toast } = useToast();

  const [editorState, setEditorState] = useState("");

  const { setSurveyDescription, setSurveyTitle, id } = useSurveyStore();
  const {
    addChoice,
    removeQuestion,
    removeChoice,
    setQuestionChoice,
    setQuestion,
    insertQuestion,
    questionArr,
    resetQuestionArr,
  } = useQuestionArrStore();
  const createQuestion = () => {
    insertQuestion({
      id: uuidv4(),
      survey_id: id,
      question: editorState,
      question_type: questionType,
      choices: choices,
    });

    toast({
      title: "Question created!",
      description: "Question created successfully.",
    });
    setChoices([""]);
    setEditorState("");
  };
  // useEffect(() => {
  //   resetQuestionArr();
  // }, []);

  useEffect(() => {
    switch (type) {
      case "1":
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Bulunduğunuz departmanı seçiniz",
          question_type: 2,
          choices: [
            "Frontend",
            "Backend",
            "Fullstack",
            "DevOps",
            "Database",
            "Diğer",
          ],
        });
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Haftada kaç gün remote olarak çalışıyorsunuz?",
          question_type: 2,
          choices: ["1", "2", "3", "4", "5"],
        });
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Kaçıncı kattasınız?",
          question_type: 2,
          choices: ["Zemin", "1.kat", "2.kat", "3.kat"],
        });
        break;
      case "2":
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "TemplateQuestion 3",
          question_type: 3,
          choices: [],
        });
        break;
      case "3":
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Çarşamba günü hangi tür erzak istersiniz?",
          question_type: 2,
          choices: [
            "Tatlı çeşidi",
            "Tuzlu çeşidi",
            "İçecek çeşidi",
            "Meyve çeşidi",
            "Kuru yemiş çeşidi",
          ],
        });
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Deparmanınızı seçiniz",
          question_type: 2,
          choices: [
            "Frontend",
            "Backend",
            "Fullstack",
            "DevOps",
            "Database",
            "Diğer",
          ],
        });
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Saat kaçta istersiniz?",
          question_type: 2,
          choices: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
        });
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Geçen haftaki erzak gününden ne kadar memnun musunuz?",
          question_type: 3, // rating gözükmüyor. yanlis yazmış olabilirsin.
          choices: [],
        });
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start ">
      {/* surveyId: {id} */}
      <p className="text-red-600">
        Çöz : Oluşturulan soruyu editleyince texteditor devre dışı kalıyor.
        Stilsiz şekilde editlenebiliyor.
      </p>
      <div className="m-10 flex h-fit w-[50%] flex-col  gap-3  rounded-2xl bg-gray-100 dark:bg-slate-900 ">
        <div className="flex h-3 w-full self-start rounded-t-2xl bg-primary"></div>
        <div className="flex flex-col gap-3 p-5">
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              if (e.target.value.length < 40) {
                setSurveyTitle(e.target.value);
              }
            }}
            placeholder="Başlıksız Döküman"
            className=" rounded-lg border-slate-600 bg-gray-200 px-2 font-sans text-3xl focus:border-b-2 focus:outline-none dark:bg-slate-800"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Anket açıklaması..."
            className=" rounded-lg border-slate-600 bg-gray-200 px-2 font-normal focus:border-b-2 focus:outline-none dark:bg-slate-800 "
            onChange={(e) => {
              setSurveyDescription(e.target.value);
            }}
          />
        </div>
      </div>
      {questionArr?.map((question) => (
        <div
          className=" mb-5 flex w-[50%] justify-between rounded-2xl  bg-gray-100 dark:bg-slate-900"
          key={question.id}
        >
          {/* {JSON.stringify(question, null, 2)} */}
          <div className="m-5 w-[85%]">
            <div className="mb-5 text-lg">
              {/*Bold italic vs. çalısmıyor.*/}
              <input
                type="text"
                placeholder={question.question}
                className=" h-[90px] w-[100%] border-slate-600 bg-gray-200 font-sans text-lg focus:border-b-2 focus:outline-none dark:bg-slate-800"
                onChange={(e) => {
                  e.preventDefault(),
                    setQuestion({
                      id: question.id,
                      questionstr: e.target.value,
                    });
                }}
              />
            </div>
            <div>
              {question.choices.map((choice, index) => (
                <div key={index} className="mb-2 flex items-center gap-2">
                  <Circle />
                  {
                    <input
                      type="text"
                      placeholder={choice}
                      className="w-[50%] rounded-lg border-slate-800 bg-gray-200 p-1 font-sans text-lg focus:border-b-2 focus:outline-none dark:bg-slate-800"
                      onChange={(e) => {
                        e.preventDefault(),
                          setQuestionChoice({
                            id: question.id,
                            index: index,
                            choicestr: e.target.value,
                          });
                      }}
                    />
                  }
                  <div
                    onClick={() => {
                      console.log("removeonces...", question.id, index);
                      removeChoice({
                        id: question.id,
                        index: index,
                      });
                      console.log("sonrası...", question.id, index);
                    }}
                  >
                    <X className="h-6  text-red-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <Trash2
              className=" m-2 flex h-[25px] w-[25px] self-center  "
              onClick={() =>
                removeQuestion({
                  id: question.id,
                })
              }
            />
            {question.question_type === 2 && (
              <button
                className="m-2 rounded-2xl border-2 bg-gray-100 py-1 text-[70%] dark:bg-slate-900"
                onClick={() => {
                  addChoice({
                    id: question.id,
                    choicestr: "newChoice",
                  });
                }}
              >
                Seçenek Ekle
              </button>
            )}
          </div>
        </div>
      ))}
      <div className=" flex  w-[50%] rounded-2xl  ">
        <div className=" w-2  rounded-bl-2xl rounded-tl-2xl bg-purple-700 "></div>
        <div className="flex  w-full flex-col bg-gray-100 p-5 dark:bg-slate-900">
          <div className="flex w-full flex-col">
            <div className="flex  w-full items-center justify-center gap-3 bg-gray-100 dark:bg-slate-900 ">
              {/* <input
                type="text"
                name="questioninput"
                id=""
                onChange={(e) => {
                  setQuestionInput(e.target.value);
                }}
                placeholder="Question"
                value={questioninput}
                className="h-[60px] w-[50%] border-slate-600 bg-gray-200 placeholder-gray-400 focus:border-b-[1px] focus:outline-none"
              /> */}
              <div className="m-2 mb-5 w-full  border  ">
                <TiptapEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </div>
              <div className=" items-center ">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex h-[60px] w-[90px] items-center justify-center rounded-md border-[1px]  text-sm ">
                      {dropdownMenuTitle}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{"Soru Tipi Seçiniz"}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* <DropdownMenuItem
                      onClick={() => {
                        setQuestionType(1);
                        setdropdownMenuTitle("Open-ended");
                      }}
                    >
                      Open-ended
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                      onClick={() => {
                        setQuestionType(2);
                        setdropdownMenuTitle("Çoktan Seçmeli");
                      }}
                    >
                      <CircleDot className="h-5" /> Çoktan Seçmeli
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setQuestionType(3);
                        setdropdownMenuTitle("Rating");
                      }}
                    >
                      <Star className="h-5" /> Puanlama
                    </DropdownMenuItem>

                    <DropdownMenuItem></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="p-2">
            {/* {questionType === 1 && <OpenEnded />} */}
            {questionType === 2 && (
              <MultipleChoice choices={choices} setChoices={setChoices} />
            )}
            {questionType === 3 && <Rating />}
          </div>
          <button
            className="flex h-[40px] w-[10%]  items-center justify-center self-center rounded-lg border-2 text-[80%]"
            type="submit"
            onClick={createQuestion}
          >
            oluştur
          </button>
          {/* <TiptapEditor
            editorState={editorState}
            setEditorState={setEditorState}
          /> */}
          {/* <ReadOnlyTiptapEditor content={editorState} /> */}
        </div>
      </div>
    </div>
  );
};

export default SurveyCreationBody;
