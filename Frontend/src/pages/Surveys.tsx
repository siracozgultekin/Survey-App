import ParticipatedCard from "@/components/ParticipatedCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserStore } from "@/store/use-user-store";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Survey } from "@/interfaces";
export interface extendedSurvey extends Survey {
  owner: {
    name: string;
    surname: string;
  };
}
type Props = {};

const Surveys = (props: Props) => {
  const { user } = useUserStore();
  const location = useLocation();

  const [participatedSurveys, setParticipatedSurveys] = useState<
    extendedSurvey[] | null
  >(null);
  return (
    <div>{}</div>
    // <div className="flex min-h-[500px] w-[80%] items-center justify-center  bg-red-600">
    //   <div className="    min-h-[300px]  rounded-xl  bg-secondary">
    //     <Tabs defaultValue="account" className="flex  w-full flex-col ">
    //       <TabsList className="w-[350px] justify-evenly self-end rounded-tr-xl bg-slate-800 ">
    //         <TabsTrigger value="inp1">My Surveys</TabsTrigger>
    //         <TabsTrigger value="inp2">Participated Surveys</TabsTrigger>
    //         <TabsTrigger value="inp3">Invites</TabsTrigger>
    //       </TabsList>
    //       <TabsContent value="inp1">
    //         Make changes to your account here.
    //       </TabsContent>
    //       <TabsContent className=" flex  flex-col  " value="inp2">
    //         <div className="" style={{ overflowY: "scroll" }}>
    //           <ul className="grid grid-cols-1 gap-4  p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    //             {participatedSurveys?.map((survey, index) => (
    //               <li key={index}>
    //                 <ParticipatedCard survey={survey} />
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       </TabsContent>
    //       <TabsContent value="inp3">invite.</TabsContent>
    //     </Tabs>
    //   </div>
    // </div>
  );
};

export default Surveys;
