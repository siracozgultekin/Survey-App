import { useState } from "react";
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
import { Circle, CircleDot, Star } from "lucide-react";
import TiptapEditor from "./editor/TiptapEditor";
import { convert } from "html-to-text";

import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import {
  setSurveyTitle,
  setSurveyDescription,
} from "@/redux/features/survey_creation/survey";
import { setQuestionArray } from "@/redux/features/survey_creation/questionArray";

const SurveyCreationBody = () => {
  const dispatch = useDispatch();

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 3);
  // // const [questionArray, setQuestionArray] = useState<Question[]>([]);
  // const [survey, setSurvey] = useState<Survey>({ id: uuidv4() } as Survey);
  const [dropdownMenuTitle, setdropdownMenuTitle] = useState("Multiple Choice");
  const [questionType, setQuestionType] = useState<number>(2);
  const [choices, setChoices] = useState([""]);

  const { toast } = useToast();

  const [editorState, setEditorState] = useState("");

  const QuestionArr = useSelector((state: RootState) => state.questionArray);
  const surveyId = useSelector((state: RootState) => state.survey.id);

  const createQuestion = () => {
    dispatch(
      setQuestionArray({
        id: uuidv4(),
        survey_id: surveyId,
        question: editorState,
        question_type: questionType,
        choices: choices,
      }),
    );

    toast({
      title: "Question created!",
      description: "Question created successfully.",
    });
    setChoices([""]);
    setEditorState("");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start bg-slate-100">
      surveyId: {surveyId}
      <div className="m-10 flex h-fit w-[50%] flex-col  gap-3  rounded-2xl bg-white ">
        <div className="flex h-3 w-full self-start rounded-t-2xl bg-blue-500"></div>
        <div className="flex flex-col gap-3 p-5">
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              if (e.target.value.length < 40) {
                dispatch(setSurveyTitle(e.target.value));
              }
            }}
            placeholder="Untitled Document"
            className=" border-slate-600 font-sans text-3xl focus:border-b-2 focus:outline-none"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Form Description"
            className=" border-slate-600 font-normal focus:border-b-2 focus:outline-none "
            onChange={(e) => {
              dispatch(setSurveyDescription(e.target.value));
            }}
          />
        </div>
      </div>
      {QuestionArr?.map((question) => (
        <div
          className="mb-5 w-[50%]   rounded-2xl bg-white p-5"
          key={question.id}
        >
          {JSON.stringify(question, null, 2)}

          <div className="mb-5 text-lg">
            {convert(question.question, { wordwrap: 130 })}{" "}
            {/*Bold italic vs. çalısmıyor.*/}
          </div>
          <div>
            {question.choices.map((choice, index) => (
              <div key={index} className="mb-2 flex gap-2">
                <Circle />
                {choice}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className=" flex h-fit w-[50%]   rounded-2xl bg-white ">
        <div className=" self-star h-full w-2 rounded-bl-2xl rounded-tl-2xl bg-purple-700"></div>
        <div className="flex w-full flex-col p-5">
          {" "}
          <div className="flex w-full flex-col">
            <div className="flex  w-full items-center justify-center gap-3 ">
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
              <div className="m-2 mb-5 w-full border">
                <TiptapEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </div>
              <div className=" items-center ">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex h-[60px] w-[90px] items-center justify-center rounded-md border-[1px] border-slate-500 bg-white text-sm ">
                      {dropdownMenuTitle}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      {"Select type of the question"}
                    </DropdownMenuLabel>
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
                        setdropdownMenuTitle("Multiple Choice");
                      }}
                    >
                      <CircleDot className="h-5" /> Multiple Choice
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setQuestionType(3);
                        setdropdownMenuTitle("Rating");
                      }}
                    >
                      <Star className="h-5" /> Rating
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
            className="flex h-[40px] w-[10%]  items-center justify-center self-center rounded-lg border-2 bg-slate-200 text-[80%]"
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
