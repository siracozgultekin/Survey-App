import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import { Link } from "react-router-dom";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { object } from "zod";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "../redux/app/store";
import { useUserStore } from "@/store/use-user-store";
import multiplech from "@/assets/multiplech.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { Survey } from "@/interfaces";
import Cookies from "js-cookie";
const Home = () => {
  // const { user } = useUserStore();
  const token = Cookies.get("token");
  const [mySurveys, setMySurveys] = useState<Survey[] | null>(null);

  useEffect(() => {
    const GetMySurveys = async () => {
      const response = await axios.get("http://localhost:5000/mySurveys", {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("response.data =>", response.data);
      setMySurveys(response.data); // Update mySurveys state
    };

    const fetchSurveys = async () => {
      await GetMySurveys();
    };

    fetchSurveys();
  }, [token]);
  function formatDate(date: Date | undefined | null) {
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString(); // You can customize the date format as needed
      return formattedDate;
    }
    return "N/A"; // Handle cases where the date is not available
  }
  return (
    <div className="h-full">
      <Header />
      <div className="flex h-full flex-col items-center  py-10">
        <div className="flex w-[100%] flex-col  items-center justify-center bg-gray-100">
          <p className=" w-[200px] p-2 text-center text-lg font-semibold ">
            Hazır Şablonlar
          </p>
          <div className=" flex h-[320px] w-[75%] min-w-[500px] place-items-center justify-evenly  gap-4 border-primary  ">
            <Link to={"/survey-creation"}>
              <div className="h-[275px] w-[215px] bg-blue-600 text-center text-secondary hover:bg-opacity-50">
                Boş Anket
              </div>
            </Link>
            <Link to={"/survey-creation"}>
              <div
                style={{
                  backgroundImage: `url(${multiplech})`,
                  backgroundSize: "cover",
                }}
                className="h-[275px] w-[215px] text-center text-secondary "
              >
                <div className="absolute z-[2]  flex h-[275px] w-[215px] flex-col items-center justify-center rounded-sm bg-blue-600 bg-opacity-60 text-lg font-semibold text-white hover:bg-opacity-10 hover:text-transparent">
                  Çoktan seçmeli Anket <Plus />
                </div>
              </div>
            </Link>
            <Link to={"/survey-creation"}>
              <div className="h-[275px] w-[215px] bg-blue-600 text-center text-secondary hover:bg-opacity-50 ">
                Derecelendirme
              </div>
            </Link>
            {/* <div className="h-[275px] w-[215px] bg-blue-600 text-center text-secondary hover:bg-opacity-50">
            Açık Uçlu... Coming Soon
          </div> */}
          </div>
        </div>
        <div className=" mt-10 flex w-[100%] min-w-[500px] flex-col items-center bg-green-100">
          <p className="my-4 w-[150px] self-center rounded-t-2xl p-2 text-lg font-semibold ">
            Anketlerim
          </p>
          <div className="grid w-[75%] min-w-[500px] grid-cols-3 place-items-center justify-evenly gap-5  overflow-x-auto pt-2">
            {mySurveys && mySurveys.length > 0 ? (
              mySurveys.map((survey) => (
                <div
                  key={survey.id}
                  className="flex h-[275px] w-[215px] flex-col gap-5 bg-red-400"
                >
                  <h3 className="text-center text-lg font-semibold ">
                    {survey.title}
                  </h3>
                  <p>Açıklama: {survey.description}</p>
                  <p>Creation Date: {formatDate(survey.creation_date)}</p>
                  <p>Deadline: {formatDate(survey.deadline)}</p>
                  <p>Katılımcı Sayısı {survey.participants.length}</p>
                </div>
              ))
            ) : (
              <p>No surveys available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
