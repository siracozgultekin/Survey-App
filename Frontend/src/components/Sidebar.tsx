import { Crown, FileText, Home, Inbox, LogOut, Plus, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SebitLogo from "@/assets/sebitLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/use-user-store";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import Setting from "./Setting";
import CreateUser from "./CreateUser";

const Sidebar = () => {
  const { user, setUser } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    document.cookie = "token=; expires=Thu, 01 Jan 1978 00:00:00 UTC; path=/;";
    navigate("login", { replace: true });
  };

  return (
    <div className="flex h-full w-[250px] flex-col justify-between border-2 px-4  py-2 ">
      <div>
        <Link to="/home">
          <img src={SebitLogo} alt="SebitPhoto" className="" />
          <div className="flex w-full justify-center  ">
            <p className=" text-center font-sans tracking-[31px] text-primary ">
              ANKE
            </p>
            <p className=" text-center font-sans text-primary ">T</p>
          </div>
        </Link>
        <hr className="mt-2 w-full" />
        <Link to="/survey-creation">
          <Button className="m-4 flex items-center  " variant="positive">
            <Plus className="mr-1" /> Yeni Anket Oluştur
          </Button>
        </Link>
        <ul className="flex flex-col gap-3">
          <li>
            <Link to="/home">
              <Button
                className="w-full justify-start gap-3 text-base"
                variant="ghost"
              >
                <Home className="h-5 w-5" />
                Anasayfa
                <div
                  className={cn(
                    "ml-auto h-full border-2 border-primary opacity-0 transition-all",
                    location.pathname === "/home" && "opacity-100",
                  )}
                />
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/inbox">
              <Button
                className="w-full justify-start gap-3 text-base"
                variant="ghost"
              >
                <Inbox className="h-5 w-5" />
                Davetler
                <div
                  className={cn(
                    "ml-auto h-full border-2 border-primary opacity-0 transition-all",
                    location.pathname === "/inbox" && "opacity-100",
                  )}
                />
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/surveys">
              <Button
                className="w-full justify-start gap-3 text-base"
                variant="ghost"
              >
                <FileText className="h-5 w-5" />
                Anketler
                <div
                  className={cn(
                    "ml-auto h-full border-2 border-primary opacity-0 transition-all",
                    location.pathname === "/surveys" && "opacity-100",
                  )}
                />
              </Button>
            </Link>
          </li>
        </ul>{" "}
      </div>
      <div className=" my-1 flex w-full flex-col gap-3">
        {user?.is_admin && (
          <div className="flex items-center self-center text-green-500">
            <CreateUser />
          </div>
        )}

        <hr className="" />
        <Popover>
          <PopoverTrigger>
            <div className=" flex items-center   text-base hover:rounded-sm hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50">
              <div className=" flex h-[30px] w-[30px] items-center justify-center rounded-full border border-gray-300 bg-gray-200 p-2 dark:border-slate-700 dark:bg-slate-800 ">
                {user?.name &&
                  user?.surname &&
                  user?.name[0].toUpperCase() + user?.surname[0].toUpperCase()}
              </div>

              <h2 className="w-full truncate  text-center  font-semibold">
                {user?.name &&
                  user?.surname &&
                  user?.name[0].toUpperCase() +
                    user?.name.slice(1) +
                    " " +
                    user?.surname.toUpperCase()}
              </h2>
              {user?.is_admin && <Crown />}
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-gray-200 dark:bg-stone-950 ">
            <ul className="flex flex-col items-start justify-start ">
              <li className="w-full">
                <Link to="/profile">
                  <Button
                    className="w-full justify-start gap-3 text-base"
                    variant="ghost"
                  >
                    <User className="h-5 w-5" />
                    Profil
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Setting />
              </li>
              <hr />
              <li className="w-full">
                <Button
                  className="w-full justify-start gap-3 text-base"
                  variant="ghost"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Çıkış Yap
                </Button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
