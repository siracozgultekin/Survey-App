import {
  BarChart3,
  FileText,
  Home,
  Inbox,
  LogOut,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Settings,
  User,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Link } from "react-router-dom";
import { useUserStore } from "@/store/use-user-store";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import Setting from "./Setting";
const Sidebar = () => {
  const { user } = useUserStore();
  const location = useLocation();

  return (
    <div className="flex h-full w-[250px] flex-col justify-between border-2 px-4  py-2 ">
      {/* <img
      src="https://www.vfabrika.com/Content/universal/img/sebit_logo.png"
      alt="SebitPhoto"
    /> */}
      <div>
        {/* <hr className="border-1 w-full " /> */}
        <Link to="/survey-creation">
          <Button className="m-4 flex items-center  " variant="positive">
            <Plus className="mr-1" /> Create New Survey
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
                Home
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
                Inbox
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
                Surveys
                <div
                  className={cn(
                    "ml-auto h-full border-2 border-primary opacity-0 transition-all",
                    location.pathname === "/surveys" && "opacity-100",
                  )}
                />
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/report">
              <Button
                className="w-full justify-start gap-3 text-base"
                variant="ghost"
              >
                <BarChart3 className="h-5 w-5" />
                Reports
                <div
                  className={cn(
                    "ml-auto h-full border-2 border-primary opacity-0 transition-all",
                    location.pathname === "/report" && "opacity-100",
                  )}
                />
              </Button>
            </Link>
          </li>
        </ul>
      </div>
      <div className=" my-1 flex w-full flex-col gap-3">
        <hr className="" />

        <Popover>
          <PopoverTrigger>
            <div className="w-full   ">
              <div className=" flex w-full justify-start gap-1 px-4 py-2 text-base hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50">
                <img
                  className=" h-6 w-6  rounded-full"
                  src="https://lh3.googleusercontent.com/ogw/AGvuzYZLTQSrTe0LDIlsQm--k_bAXXHjgoBMKN82rFyZ=s32-c-mo"
                  alt="pp"
                />
                <h2 className="w-full truncate  text-center  font-semibold">
                  {user?.name &&
                    user?.surname &&
                    user?.name + " " + user?.surname}
                </h2>
                <MoreVertical className="" />
                <div />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-stone-950 ">
            <ul className="flex flex-col items-start justify-start ">
              <li className="w-full">
                <Link to="/profile">
                  <Button
                    className="w-full justify-start gap-3 text-base"
                    variant="ghost"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Setting />
              </li>
              <hr />
              <li className="w-full">
                <Link to="/home">
                  <Button
                    className="w-full justify-start gap-3 text-base"
                    variant="ghost"
                  >
                    <LogOut className="h-5 w-5" />
                    Log Out
                  </Button>
                </Link>
              </li>
            </ul>
          </PopoverContent>
        </Popover>

        {/* <p className="    pl-4 pt-2 text-center text-[10px] ">
          <span className=" font-semibold">SAS</span> Version 1.12
        </p> */}
      </div>
    </div>
  );
};

export default Sidebar;
