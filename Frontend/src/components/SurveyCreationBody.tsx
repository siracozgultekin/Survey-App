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
import MultipleChoice from "./questiontype/MultipleChoice";
import Rating from "./questiontype/Rating";
import { Circle, CircleDot, Star, Trash2, X } from "lucide-react";
import TiptapEditor from "./editor/TiptapEditor";
import { useToast } from "@/components/ui/use-toast";
import { useSurveyStore } from "@/store/use-survey-store";
import { useQuestionArrStore } from "@/store/use-questionArr-store";
import { useEditorStore } from "@/store/use-editor.store";
import { Button } from "@/components/ui/button";

type Props = {
  type: string;
};

const SurveyCreationBody = ({ type }: Props) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 3);
  const [dropdownMenuTitle, setdropdownMenuTitle] = useState("Çoktan Seçmeli");
  const [questionType, setQuestionType] = useState<string>("2");
  const [choices, setChoices] = useState([""]);
  const [rate, setRate] = useState<string>("0");
  const [question_id, setQuestion_id] = useState<string>("");
  const { toast } = useToast();

  const [editorState, setEditorState] = useState("");
  const [editorState2, setEditorState2] = useState("");
  const { editor } = useEditorStore();

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
      title: "Soru oluşturuldu!",
      description: "Sorunuz başarıyla oluşturuldu.",
    });
    setChoices([""]);
    setEditorState("");
    if (editor) {
      editor.commands.clearContent();
    }
  };
  const handleQuestionIdChange = (id: string) => {
    setQuestion_id(id);
  };
  useEffect(() => {
    setQuestion({
      id: question_id,
      questionstr: editorState2,
    });
  }, [question_id]);

  useEffect(() => {
    switch (type) {
      case "1":
        resetQuestionArr();
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Bulunduğunuz departmanı seçiniz",
          question_type: "2",
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
          question_type: "2",
          choices: ["1", "2", "3", "4", "5"],
        });
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Kaçıncı kattasınız?",
          question_type: "2",
          choices: ["Zemin", "1.kat", "2.kat", "3.kat"],
        });
        break;
      case "2":
        resetQuestionArr();
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Sizce yapılacak olan etkinliğin teması ne olmalı?",
          question_type: "2",
          choices: ["Kültür", "Teknoloji", "Spor", "Eğitim", "Sağlık", "Diğer"],
        });
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Etkinlik ne zaman yapılmalı?",
          question_type: "2",
          choices: ["Hafta içi", "Hafta sonu", "Öğle arası", "Akşam", "Diğer"],
        });
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Etkinlik nerede yapılmalı?",
          question_type: "2",
          choices: ["Ofis", "Dışarı", "Online", "Diğer"],
        });
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Etkinlik ne kadar sürmeli?",
          question_type: "2",
          choices: ["1 saat", "2 saat", "3 saat", "Diğer"],
        });
        break;
      case "3":
        resetQuestionArr();

        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Çarşamba günü hangi tür erzak istersiniz?",
          question_type: "2",
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
          question_type: "2",
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
          question_type: "2",
          choices: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
        });
        insertQuestion({
          id: uuidv4(),
          survey_id: id,
          question: "Geçen haftaki erzak gününden ne kadar memnun musunuz?",
          question_type: "3", // rating gözükmüyor. yanlis yazmış olabilirsin.
          choices: [],
        });
        break;
      default:
        resetQuestionArr();

        break;
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start ">
      {" "}
      {/* surveyId: {id} */}
      {/* <p className="text-red-600">
        Çöz : Oluşturulan soruyu editleyince texteditor devre dışı kalıyor.
        Stilsiz şekilde editlenebiliyor.
      </p> */}
      <div className="m-10 flex h-fit w-[50%] flex-col  gap-3 rounded-2xl border bg-gray-100 dark:bg-slate-900 ">
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
            placeholder="Başlıksız Anket"
            className="  border-slate-600 bg-gray-100 px-2 font-sans text-3xl focus:border-b-2 focus:outline-none dark:bg-slate-800"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Anket açıklaması..."
            className="  border-slate-600 bg-gray-100 px-2 font-normal focus:border-b-2 focus:outline-none dark:bg-slate-800 "
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
          <div className="m-5 w-full">
            <div className="mb-5 text-lg">
              {/*Bold italic vs. çalısmıyor.*/}
              {/* <input
                type="text"
                placeholder={question.question}
                value={question.question}
                className=" h-[90px] w-[100%] border-slate-600 bg-gray-200 font-sans text-lg focus:border-b-2 focus:outline-none dark:bg-slate-800"
                onChange={(e) => {
                  e.preventDefault(), setQuestion_id(question.id);

                  setQuestion({
                    id: question.id,
                    questionstr: e.target.value,
                  });
                }}
              /> */}
              <div className=" mb-5 w-full  border  ">
                <TiptapEditor
                  editorState={question.question}
                  setEditorState={setEditorState2} //buraya handler ver
                />
              </div>{" "}
            </div>
            <div>
              {question.choices.map((choice, index) => (
                <div key={index} className="mb-2 flex items-center gap-2">
                  <Circle className="h-5 w-5" />
                  {
                    <input
                      type="text"
                      placeholder={choice}
                      className="w-full rounded-lg border-slate-800 bg-gray-200 p-1 font-sans text-lg  focus:border-b-2 focus:outline-none dark:bg-slate-800"
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
              {question.question_type === "2" && (
                <div className="flex content-center items-center gap-2">
                  <Circle className="h-5 w-5" />
                  <button
                    className="h-10 w-[15%] rounded-lg  text-start text-[85%] underline"
                    onClick={() => {
                      addChoice({
                        id: question.id,
                        choicestr: `${question.choices.length + 1}. Seçenek`,
                      });
                    }}
                  >
                    Seçenek Ekle
                  </button>
                </div>
              )}
            </div>{" "}
            <div
              className=" flex  items-center justify-end
               gap-2
          "
            >
              <Trash2
                className="   h-[25px] w-[25px]   "
                onClick={() =>
                  removeQuestion({
                    id: question.id,
                  })
                }
              />{" "}
              <Button
                variant="ghost"
                onClick={() => handleQuestionIdChange(question.id)}
                className="flex self-end rounded-br-lg text-primary "
              >
                Değişikliği Kaydet
              </Button>
            </div>
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
              <div className=" mb-5 w-full  border  ">
                <TiptapEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </div>
              <div className=" m-7 items-center ">
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
                        setQuestionType("2");
                        setdropdownMenuTitle("Çoktan Seçmeli");
                      }}
                    >
                      <CircleDot className="h-5" /> Çoktan Seçmeli
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setQuestionType("3");
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
          <div className=" pt-2">
            {/* {questionType === 1 && <OpenEnded />} */}
            {questionType === "2" && (
              <MultipleChoice choices={choices} setChoices={setChoices} />
            )}
            {questionType === "3" && <Rating />}
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
