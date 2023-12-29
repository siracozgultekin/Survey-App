import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/store/use-user-store";
import Cookies from "js-cookie";
import { Survey, User } from "@/interfaces";
import { Mail } from "lucide-react";
import ChangePassword from "@/components/ChangePassword";
import axios from "axios";

export interface extendedSurvey extends Survey {
  owner: {
    name: string;
    surname: string;
  };
}

const Profile = () => {
  const user = useUserStore((state) => state.user);

  const token = Cookies.get("token");

  const [participatedSurveys, setParticipatedSurveys] = useState<
    extendedSurvey[] | null
  >(null);
  const [createdSurveys, setCreatedSurveys] = useState<Survey[] | null>(null);
  useEffect(() => {
    user && console.log(user);
    const getCreatedSurveys = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/survey/get-my-surveys",
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );
        console.log("res.data=>", res.data);
        setCreatedSurveys(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCreatedSurveys();
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="bg- m-10 flex h-[75%]">
        <div className="flex w-full flex-col items-center  rounded-xl bg-gray-100 dark:bg-slate-900">
          <Avatar className=" my-10 flex h-[200px] w-[200px] ">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gray-200 text-3xl font-semibold dark:bg-slate-800">
              {user?.name &&
                user?.surname &&
                user?.name[0].toUpperCase() + user?.surname[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>{" "}
          <h3 className="w-full bg-gray-200 text-center text-3xl font-semibold dark:bg-slate-800">
            {user && user.name} {user && user.surname}
          </h3>
          <div className=" my-10  flex w-full gap-5 text-lg ">
            <div className=" flex w-full flex-col gap-10">
              <h3 className="text-md mx-2 flex gap-3 text-black dark:text-white">
                <span className="font-semibold underline">Departman:</span>
                {user && user.department}
              </h3>
              <h3 className=" text-md mx-2 flex  gap-3 text-black dark:text-white">
                <span className="font-semibold underline"> E-Posta: </span>
                {user && user.email}
              </h3>
              <h3 className="text-md mx-2 flex gap-3 text-black dark:text-white">
                <span className="font-semibold underline">
                  Kaydolma Tarihi:
                </span>
                {user &&
                  user.registration_date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
              </h3>
              {/* register_date olarak çagırılıyor fakat obje içerisinde registiration_date olarak geçiyor??? */}

              <h3 className="mx-2 flex gap-3 text-black dark:text-white">
                <span className="font-semibold underline">
                  Katıldığım Anket Sayısı:
                </span>
                {user && user.participated_surveys.length}
              </h3>
              <h3 className="mx-2 flex gap-3 text-black dark:text-white">
                <span className="font-semibold underline">
                  Oluşturduğum Anket Sayısı:
                </span>
                {createdSurveys && createdSurveys.length}
              </h3>
            </div>
            <div>
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
