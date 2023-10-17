import SurveyCreationBody from "@/components/SurveyCreationBody";
import SurveyCreationHeader from "@/components/SurveyCreationHeader";

import { useState } from "react";

type Props = {};

const SurveyCreation = (props: Props) => {
  const [titleInp, setTitleInp] = useState<string>("Untitled Document");

  return (
    <div className="h-full">
      <div className="h-[10%]">
        {" "}
        <SurveyCreationHeader titleInp={titleInp} />
      </div>
      <div className="h-[90%]">
        <SurveyCreationBody setTitleInp={setTitleInp} titleInp={titleInp} />
      </div>
    </div>
  );
};

export default SurveyCreation;
