import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type Props = { setTitleInp: React.Dispatch<React.SetStateAction<string>> };

const SurveyCreationBody = ({ setTitleInp }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start bg-slate-100">
      <div className="m-10 flex h-fit w-[50%] flex-col  gap-3  rounded-2xl bg-white ">
        <div className="flex h-3 w-full self-start rounded-t-2xl bg-blue-500"></div>
        <div className="flex flex-col gap-3 p-10">
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setTitleInp((prev) => {
                if (e.target.value.length > 40) {
                  return prev;
                }

                return e.target.value;
              });
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
          />
        </div>
      </div>
      <div className=" flex h-fit w-[50%]   rounded-2xl bg-white ">
        <div className=" self-star h-full w-2 rounded-bl-2xl rounded-tl-2xl bg-purple-700"></div>
        <div className="flex w-full flex-col">
          <div className="flex h-[100px] w-full items-center justify-center gap-3 ">
            <input
              type="text"
              name=""
              id=""
              placeholder="Question"
              className="h-[60px] w-[50%] border-slate-600 bg-gray-200 placeholder-gray-400 focus:border-b-[1px] focus:outline-none"
            />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="h-[60px] rounded-md border-[1px] border-slate-500 bg-white ">
                  Burası seçilene göre değişecek
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>"menu label"</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>Profile</DropdownMenuItem>

                <DropdownMenuItem></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <input type="radio" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyCreationBody;
