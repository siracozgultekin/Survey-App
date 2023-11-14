import { DeleteIcon, X } from "lucide-react";
import React, { useState } from "react";

type Props = {
  choices: string[];
  setChoices: React.Dispatch<React.SetStateAction<string[]>>;
};
const MultipleChoice = ({ choices, setChoices }: Props) => {
  const addChoice = () => {
    const newChoices = [...choices, ``];
    setChoices(newChoices);
  };

  const deleteChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  return (
    <div className="flex w-full justify-between">
      <div className=" w-full  flex-col ">
        {choices.map((choice, index) => (
          <div key={index} className="flex w-full pb-2  pr-5">
            <input
              type="text"
              placeholder="New Choice"
              className=" w-[75%] rounded-lg border-slate-900 bg-gray-200 p-2  focus:border-b-2 focus:outline-none dark:border-gray-200 dark:bg-slate-800"
              value={choice}
              onChange={(e) => {
                const newChoices = [...choices];
                newChoices[index] = e.target.value;
                setChoices(newChoices);
              }}
            />
            <button
              className="ml-2 flex h-7 items-center self-center bg-transparent "
              onClick={() => deleteChoice(index)}
            >
              <X className="  text-red-700" />
            </button>
          </div>
        ))}
      </div>
      <button
        className="h-10 w-[15%] rounded-lg border-2 bg-gray-100 text-[70%] dark:bg-slate-900"
        onClick={addChoice}
      >
        Add Choice
      </button>
    </div>
  );
};

export default MultipleChoice;
