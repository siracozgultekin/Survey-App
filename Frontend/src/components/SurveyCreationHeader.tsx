import React from "react";
import { Eye, FileText } from "lucide-react";
import { Button } from "./ui/button";
type Props = {};

const SurveyCreationHeader = (props: Props) => {
  return (
    <div className="flex h-[80px] items-center justify-between bg-gray-200 px-8">
      <div className="flex items-center">
        <FileText className="h-11 w-11 rounded-lg text-blue-500" />
        <h3>Survey title</h3>
      </div>
      <div className="flex items-center gap-5">
        <Eye className="h-8 w-8 text-slate-700" />
        <Button className="bg-blue-500 text-white">Publish</Button>
      </div>
    </div>
  );
};

export default SurveyCreationHeader;
