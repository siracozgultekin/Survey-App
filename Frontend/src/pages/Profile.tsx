import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/store/use-user-store";
import Cookies from "js-cookie";
import { Survey, User } from "@/interfaces";
import { Mail } from "lucide-react";
import ChangePassword from "@/components/ChangePassword";

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
  useEffect(() => {
    user && console.log(user);
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="bg- m-10 flex h-[75%]">
        <div className="flex w-full flex-col items-center  rounded-xl bg-gray-100 dark:bg-slate-900">
          <Avatar className=" my-10 flex h-[200px] w-[200px] ">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gray-200 text-2xl font-semibold dark:bg-slate-800">
              {user && user.name[0]}
              {user && user.surname[0]}
            </AvatarFallback>
          </Avatar>{" "}
          <h3 className="w-full bg-gray-200 text-center text-2xl font-bold dark:bg-slate-800">
            {user && user.name} {user && user.surname}
          </h3>
          <div className=" flex  w-full gap-5">
            <div className=" flex w-full flex-col gap-5">
              <h3 className="text-md mx-2 font-semibold text-black dark:text-white ">
                Departman: {user && user.department}
              </h3>
              <h3 className=" text-md mx-2 flex  font-semibold text-black dark:text-white">
                Mail: {user && user.email}
              </h3>
              <h3 className="text-md mx-2 font-semibold text-black dark:text-white ">
                Kaydolma Tarihi:{" "}
                {user &&
                  user.registration_date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
              </h3>
              {/* register_date olarak çagırılıyor fakat obje içerisinde registiration_date olarak geçiyor??? */}

              <p className="mx-2 text-black dark:text-white">
                Katıldığım Anket Sayısı:{" "}
                {user && user.participated_surveys.length}
              </p>
              <p className="mx-2 text-black dark:text-white">
                Oluşturduğum Anket Sayısı: ?
              </p>
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
