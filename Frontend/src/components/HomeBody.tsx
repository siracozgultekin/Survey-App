import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { object } from "zod";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "../redux/app/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Survey } from "@/interfaces";
import Cookies from "js-cookie";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const HomeBody = () => {
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
    <>
      <div className="flex h-full flex-col items-center  pb-0">
        <p className=" my-4 w-[80%] text-3xl font-semibold text-primary ">
          Hazır Şablonlar
        </p>
        <div className="mb-5 flex w-[80%] flex-col items-center justify-center rounded-md bg-gray-200 p-3 dark:bg-slate-900 ">
          <div className=" flex h-[320px] w-[75%] min-w-[500px] place-items-center justify-evenly  gap-4 border-primary  ">
            <Link to={"/survey-creation"}>
              <div className=" h-[275px] w-[215px] border-blue-600 bg-secondary text-center text-secondary shadow-2xl">
                <div className="absolute z-[2]  flex h-[275px] w-[215px] flex-col items-center justify-center rounded-sm text-lg font-semibold text-primary hover:bg-primary hover:text-white dark:text-white">
                  Boş Anket <Plus />
                </div>
              </div>
            </Link>
            <Link to={"/survey-creation?template=1"}>
              <div
                // style={{
                //   backgroundImage: `url(${multiplech})`,
                //   backgroundSize: "cover",
                // }}
                className="h-[275px] w-[215px] bg-secondary text-center text-secondary  shadow-2xl"
              >
                <div className="absolute z-[2]  flex h-[275px] w-[215px] flex-col items-center justify-center rounded-sm text-lg font-semibold text-primary hover:bg-primary hover:text-white dark:text-white">
                  Çalışan Geri Bildirimi Anketi <Plus />
                </div>
              </div>
            </Link>
            <Link to={"/survey-creation?template=2"}>
              <div className="h-[275px] w-[215px] bg-secondary text-center text-secondary  shadow-2xl">
                <div className="absolute z-[2]  flex h-[275px] w-[215px] flex-col items-center justify-center rounded-sm text-lg font-semibold text-primary hover:bg-primary hover:text-white dark:text-white">
                  Etkinlik Anketi <Plus />
                </div>
              </div>
            </Link>
            <Link to={"/survey-creation?template=3"}>
              <div className="h-[275px] w-[215px] bg-secondary text-center text-secondary  shadow-2xl">
                <div className="absolute z-[2]  flex h-[275px] w-[215px] flex-col items-center justify-center rounded-sm text-lg font-semibold text-primary hover:bg-primary hover:text-white dark:text-white">
                  Erzak Belirleme Anketi <Plus />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className=" w-[80%] ">
          <p className="my-4 self-center rounded-t-2xl  text-3xl font-semibold text-primary">
            Anketlerim (Yakın Zamanda)
          </p>
          <Table className="">
            <TableCaption>(Yakın zamanda oluşturulan anketler)</TableCaption>
            <TableHeader>
              <TableRow className=" hover:bg-transparent">
                <TableHead className="bg-gray-200 dark:bg-slate-900">
                  Başlık
                </TableHead>
                <TableHead className="bg-gray-200 dark:bg-slate-900">
                  Oluşturma Tarihi
                </TableHead>
                <TableHead className="bg-gray-200 dark:bg-slate-900">
                  Bitiş tarihi
                </TableHead>
                <TableHead className="bg-gray-200 dark:bg-slate-900">
                  Katılımcı Sayısı
                </TableHead>
                <TableHead className="bg-gray-200 dark:bg-slate-900"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=" ">
              {mySurveys && mySurveys.length > 0 ? (
                mySurveys.map((survey) => (
                  <TableRow key={survey.id} className="border-b-2">
                    <TableCell className="  font-semibold ">
                      {survey.title}
                    </TableCell>
                    <TableCell className="">
                      {" "}
                      {formatDate(survey.creation_date)}
                    </TableCell>
                    <TableCell className="">
                      {" "}
                      {formatDate(survey.deadline)}
                    </TableCell>
                    <TableCell className="">
                      {" "}
                      {survey.participants.length}
                    </TableCell>
                    <TableCell>
                      {/* <Link to={`/survey/${survey.id}`}> */}
                      <Button variant="ghost" className="">
                        Görüntüle
                      </Button>
                      {/* </Link> */}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    Anketiniz Bulunmamaktadır...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default HomeBody;
