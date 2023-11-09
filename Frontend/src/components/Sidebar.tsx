import {
  BarChart3,
  FileText,
  Home,
  Inbox,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";

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
        <div className="w-full ">
          <Link to="/profile">
            <Button
              className=" w-full justify-start gap-2  px-4 text-base"
              variant="ghost"
            >
              <img
                className=" h-6 w-6 rounded-full "
                src="https://lh3.googleusercontent.com/ogw/AGvuzYZLTQSrTe0LDIlsQm--k_bAXXHjgoBMKN82rFyZ=s32-c-mo"
                alt="pp"
              />
              <h2 className="w-full truncate text-center text-lg font-semibold">
                {user?.name &&
                  user?.surname &&
                  user?.name + " " + user?.surname}
              </h2>
              <div
                className={cn(
                  "ml-auto h-full border-2 border-primary opacity-0 transition-all",
                  location.pathname === "/profile" && "opacity-100",
                )}
              />
            </Button>
          </Link>
        </div>
        <hr className="border-1 w-full " />
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
            <Link to="/home">
              <Button
                className="w-full justify-start gap-3 text-base"
                variant="ghost"
              >
                <Inbox className="h-5 w-5" />
                Inbox
                <div
                  className={cn(
                    "ml-auto h-full border-2 border-primary opacity-0 transition-all",
                    location.pathname === "/notifications" && "opacity-100",
                  )}
                />
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <Button
                className="w-full justify-start gap-3 text-base"
                variant="ghost"
              >
                <FileText className="h-5 w-5" />
                My Surveys
                <div
                  className={cn(
                    "ml-auto h-full border-2 border-primary opacity-0 transition-all",
                    location.pathname === "/mysurveys" && "opacity-100",
                  )}
                />
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/home">
              <Button
                className="w-full justify-start gap-3 text-base"
                variant="ghost"
              >
                <BarChart3 className="h-5 w-5" />
                Reports
              </Button>
              <div
                className={cn(
                  "ml-auto h-full border-2 border-primary opacity-0 transition-all",
                  location.pathname === "/reports" && "opacity-100",
                )}
              />
            </Link>
          </li>
        </ul>
      </div>
      <div className=" w-full">
        <hr className="py-3" />

        <ul className="flex flex-col items-start justify-start ">
          <li className="w-full">
            <Setting />
          </li>
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

        <p className=" pl-4 pt-2 text-xs">
          <span className=" font-semibold">SAS</span> Version 1.12
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
