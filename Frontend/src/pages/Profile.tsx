import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Loader2 } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Cookies from "js-cookie";
import { Survey, User } from "@/interfaces";
import { current } from "@reduxjs/toolkit";
import { get } from "http";
import { set } from "zod";
import ParticipatedCard from "@/components/ParticipatedCard";

export interface extendedSurvey extends Survey {
  owner: {
    name: string;
    surname: string;
  };
}

const Profile = () => {
  const token = Cookies.get("token");

  const userFromRedux = useSelector((state: RootState) => state.user);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [participatedSurveys, setParticipatedSurveys] = useState<
    extendedSurvey[] | null
  >(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/currentuser`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(
          "response.data.participated_surveys:",
          response.data.participatedSurveys,
        );

        setCurrentUser(response.data.user); //localstorage üzerinden redux içindeki id modify edilirse(başka kullanıcı id si yazılırsa mesela), burası da ona göre değişecektir.
        setParticipatedSurveys(response.data.participatedSurveys);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchData();
  }, []);

  if (!currentUser) {
    return (
      <Loader2 className="flex h-full w-full animate-spin content-center justify-center" />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="bg- m-10 flex h-[75%]">
        <div className="flex w-[300px] flex-col items-center  rounded-xl  bg-gray-100">
          <Avatar className=" my-10 flex h-[200px] w-[200px] ">
            <AvatarImage src="" />
            <AvatarFallback className="bg-slate-300 text-2xl font-semibold">
              {currentUser && currentUser.name[0]}
              {currentUser && currentUser.surname[0]}
            </AvatarFallback>
          </Avatar>
          <div className=" flex w-full flex-col gap-3">
            <hr />
            <h3 className="w-full bg-slate-300 text-center text-2xl font-bold">
              {currentUser && currentUser.name}{" "}
              {currentUser && currentUser.surname}
            </h3>
            <h3 className="text-md mx-2 font-semibold text-blue-600 ">
              Rank, Department
            </h3>
            <h3 className=" text-md mx-1 flex  font-bold">
              <Mail className=" mx-1 flex w-3 pt-1" />
              {currentUser && currentUser.email}
            </h3>
            <p className="mx-2">
              Participated Surveys: {currentUser.participated_surveys.length}
            </p>
            <p className="mx-2">Created Surveys: 3</p>
          </div>
          <div className="flex flex-col items-center"></div>
        </div>
        <div className="ml-[60px]  min-h-[300px] w-[75%] rounded-xl  bg-gray-100">
          <div className=" ">
            <Tabs
              defaultValue="account"
              className="flex h-[70%] w-full flex-col "
            >
              <TabsList className="w-[350px] justify-evenly self-end rounded-tr-xl bg-slate-400 ">
                <TabsTrigger value="inp1">My Surveys</TabsTrigger>
                <TabsTrigger value="inp2">Participated Surveys</TabsTrigger>
                <TabsTrigger value="inp3">Invites</TabsTrigger>
              </TabsList>
              <TabsContent value="inp1">
                Make changes to your account here.
              </TabsContent>
              <TabsContent className=" flex  flex-col  " value="inp2">
                <div className="h-[475px]" style={{ overflowY: "scroll" }}>
                  <ul className="grid grid-cols-1 gap-4  p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {participatedSurveys?.map((survey, index) => (
                      <>
                        <li key={index}>
                          <ParticipatedCard survey={survey} />
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="inp3">invite.</TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
