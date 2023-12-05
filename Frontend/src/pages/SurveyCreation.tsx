import SurveyCreationBody from "@/components/SurveyCreationBody";
import SurveyCreationHeader from "@/components/SurveyCreationHeader";
import { useSearchParams } from "react-router-dom";
const SurveyCreation = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("template") ?? "0";
  return (
    <div className="h-full ">
      <div className="sticky top-0  h-[10%]">
        <SurveyCreationHeader type={type} />
      </div>
      <div className=" h-[90%] ">
        <SurveyCreationBody type={type} />
      </div>
    </div>
  );
};

export default SurveyCreation;
