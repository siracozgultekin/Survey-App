import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLocation } from "react-router-dom";
import { Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { object } from "zod";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/app/store";

const Home = () => {
  const userRedux = useSelector((state: RootState) => state.user);
  console.log(`reduxtan gelen user:`, userRedux);
  // const [currentUser, setCurrentUser] = useState<object | null>(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/currentuser/${userRedux.id}`,
  //       );
  //       // setCurrentUser(response.data);
  //       console.log(`currentuser:`, response.data);
  //     } catch (error) {
  //       console.error("Error fetching current user:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="h-full">
      <Header />
      <div className="flex h-full flex-col items-center bg-slate-400 py-10">
        <div className="m-3 flex flex-col items-center">
          <h3 className="my-2 text-xl font-bold">Create New Survey</h3>
          <Link to={"/survey-creation"}>
            <Button className="h-14 w-14 rounded-full bg-green-800">
              <Plus />
            </Button>
          </Link>
        </div>
        <div className=" grid h-[320px] w-[75%] min-w-[500px] grid-cols-3 place-items-center justify-center gap-4 overflow-x-auto border-2 border-slate-500">
          {userRedux.participated_surveys?.map((item, index: number) => (
            <div
              key={index}
              className="flex h-[150px] w-[150px] items-center justify-center border-2 bg-red-500 text-xl font-bold text-white"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
