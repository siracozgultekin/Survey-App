import SurveyCreationBody from "@/components/SurveyCreationBody";
import SurveyCreationHeader from "@/components/SurveyCreationHeader";

const SurveyCreation = () => {
  return (
    <div className="h-full ">
      <div className="sticky top-0  h-[10%]">
        <SurveyCreationHeader />
      </div>
      <div className=" h-[90%] ">
        <SurveyCreationBody />
      </div>
    </div>
  );
};

export default SurveyCreation;
