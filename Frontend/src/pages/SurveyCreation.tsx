import SurveyCreationBody from "@/components/SurveyCreationBody";
import SurveyCreationHeader from "@/components/SurveyCreationHeader";
import React from "react";

type Props = {};

const SurveyCreation = (props: Props) => {
  return (
    <div>
      <SurveyCreationHeader />
      <SurveyCreationBody />
    </div>
  );
};

export default SurveyCreation;
