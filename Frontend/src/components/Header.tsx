import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, Search, LogOut, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import { ModeToggle } from "./mode-toggle";
// import Drawer from "./Drawer";
const Header = () => {
  const backgroundImageUrl =
    "https://www.desktopbackground.org/download/2560x1440/2012/09/28/459792_wallpapers-old-paper-wallpapers-cave_3000x2000_h.jpg";
  const userRedux = useSelector((state: RootState) => state.user);
  return (
    <div
      className="flex h-[65px]  w-full flex-row items-center  "
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className="ml-2  flex flex-1 items-center ">
        <ModeToggle />
        <button className=" mx-2 flex items-center">
          <FileText className="rounded-lg text-green-600" />
          <p className="text-lg font-bold">
            <Link to="/home">SAS</Link>
          </p>
        </button>
      </div>

      <div className="flex h-[75%] flex-1 rounded-lg bg-white opacity-60  ">
        <input
          className="h-full w-full rounded-lg  outline-none "
          type="text"
        />
        <button className="px-1" type="submit">
          <Search />
        </button>
      </div>

      <div className=" mr-5 flex flex-1 items-center justify-end gap-3">
        {userRedux.name}
        <DropdownMenu>
          <DropdownMenuTrigger className="f">
            <img
              className="h-10 w-10 rounded-full "
              src="https://lh3.googleusercontent.com/ogw/AGvuzYZLTQSrTe0LDIlsQm--k_bAXXHjgoBMKN82rFyZ=s32-c-mo"
              alt="pp"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {userRedux?.name} {userRedux?.surname}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/profile">
              <DropdownMenuItem>
                <UserCircle className="mr-2 w-4" />
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <LogOut className="mr-2 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
