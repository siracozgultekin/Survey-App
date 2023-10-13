import React from "react";
import { Eye, FileText } from "lucide-react";
import { Button } from "./ui/button";
type Props = { titleInp: string };

const SurveyCreationHeader = ({ titleInp }: Props) => {
  return (
    <div className="flex h-full items-center justify-between border-b-[1px] border-gray-300 px-8">
      <div className="flex items-center">
        <FileText className="h-10 w-10 rounded-lg text-blue-500" />

        <h3 className="w-[400px] font-semibold">{titleInp}</h3>
      </div>
      <div className="flex items-center gap-5">
        <Eye className="h-6 w-6 text-slate-700" />
        <Button className="bg-blue-500 text-white">Publish</Button>
      </div>
    </div>
  );
};

export default SurveyCreationHeader;
