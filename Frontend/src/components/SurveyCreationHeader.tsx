import {
  Eraser,
  Eye,
  FileText,
  Ghost,
  Key,
  Mail,
  UserPlus2,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import axios, { AxiosError } from "axios";
import { useSurveyStore } from "@/store/use-survey-store";
import { useUserStore } from "@/store/use-user-store";
import { useQuestionArrStore } from "@/store/use-questionArr-store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import type { User } from "@/interfaces";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DatePickerWithPresets } from "./ui/datePicker";

type Props = {
  type: string;
};
const SurveyCreationHeader = ({ type }: Props) => {
  const surveyStore = useSurveyStore();
  const { user } = useUserStore();
  const { questionArr, resetQuestionArr } = useQuestionArrStore();
  const [filteredUsersArr, setFilteredUsersArr] = useState<User[]>([]);
  const [allUsersArr, setAllUsersArr] = useState<User[]>([]);
  const [allUsersArr2, setAllUsersArr2] = useState<User[]>([]);
  const [invitedUsersArr, setInvitedUsersArr] = useState<User[]>([]);
  const [searchInp, setSearchInp] = useState<string>("");
  const [leftHeader, setLeftHeader] = useState<string>("");
  const [deadline, setDeadline] = useState<Date>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );
  const token = Cookies.get("token");
  useEffect(() => {
    //get users from db with user.department value

    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/user/users/${user?.department}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      setAllUsersArr(
        res.data.filter((usr: User) => {
          return usr.id !== user?.id;
        }),
      );
      setAllUsersArr2(
        res.data.filter((usr: User) => {
          return usr.id !== user?.id;
        }),
      );
      setFilteredUsersArr(
        res.data.filter((usr: User) => {
          return usr.id !== user?.id;
        }),
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    searchUsersArr(searchInp);
  }, [allUsersArr]);

  useEffect(() => {
    switch (type) {
      case "0":
        setLeftHeader("Boş Şablon");
        break;
      case "1":
        setLeftHeader("Çalışan Memnuniyeti Anketi");
        break;
      case "2":
        setLeftHeader("Etkinlik Değerlendirme Anketi");
        break;
      default:
        setLeftHeader("Erzak Belirleme Anketi");
        break;
    }
  }, []);

  const navigate = useNavigate();

  const RemoveAllUsers = () => {
    setAllUsersArr(allUsersArr2);
    setInvitedUsersArr([]);
  };

  const searchUsersArr = (searchInp: string) => {
    const res = allUsersArr.filter((user) => {
      return user.name.toLowerCase().includes(searchInp);
    });
    setFilteredUsersArr(res);
  };

  const CreateSurvey = async () => {
    const year = deadline.getUTCFullYear();
    const month = deadline.getUTCMonth();
    const day = deadline.getUTCDate();
    const deadlineDate = new Date(Date.UTC(year, month, day, 23, 59));

    const dataSent = {
      id: surveyStore.id,
      owner_id: user?.id,
      title: surveyStore.title,
      description: surveyStore.description,
      creation_date: surveyStore.creation_date,
      deadline: deadlineDate, // new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      participants: [],
      questions: questionArr,
      is_active: true,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/survey/Insert-survey-and-questions",
        {
          //dataSent is equal to: { ...survey, questions: questionArray },
          dataSent,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      if (res.status === 200) {
        toast({
          title: "Survey created!",
          description: "Survey created successfully.",
        });
        surveyStore.resetsurveyStore();
        resetQuestionArr();
        navigate("/home");
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        console.log("err=>", err.response?.data);
        toast({
          title: "Form boş yollanılamaz",
          variant: "destructive",
        });
      } else if (err.response?.status === 500) {
        const { error } = err.response?.data as { error: string };
        toast({
          title: error,
          description:
            "Please check your internet connection and try again later.",
          variant: "destructive",
        });
      }
    }
  };
  const CreateInvitations = async () => {
    try {
      axios.post(
        "http://localhost:5000/invitation/insert-invitations",
        {
          invitedUserArr: invitedUsersArr,
          survey_id: surveyStore.id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
    } catch (error) {
      console.log("error=>", error);
    }
  };
  const Publish = async () => {
    CreateSurvey();
    //be sure that survey is created
    await new Promise((resolve) => setTimeout(resolve, 1000));
    CreateInvitations();

    surveyStore.resetsurveyStore();
    resetQuestionArr();
    setInvitedUsersArr([]);
    navigate("/home");
  };

  const AddUser = (usr: User) => {
    setInvitedUsersArr((prev: User[]) => [...prev, usr]);
    const filteredUsers = allUsersArr.filter((user) => {
      return user.id !== usr.id;
    });
    setAllUsersArr(filteredUsers);
  };

  const RemoveUser = (usr: User) => {
    const filteredUsers = invitedUsersArr.filter((user) => {
      return usr.id !== user.id;
    });
    setInvitedUsersArr(filteredUsers);
    setAllUsersArr((prev: User[]) => [...prev, usr]);
  };

  return (
    <div className=" flex h-full items-center justify-between border-b bg-white px-8 py-3 dark:bg-slate-950">
      <div className="flex items-center">
        {/* <h3 className="w-[400px] font-semibold">{surveyStore.title}</h3> */}
        <h3 className=" pr-5 font-semibold"> {leftHeader} </h3>
        {
          <button title="Tüm soruları sil" onClick={resetQuestionArr}>
            <Eraser />
          </button>
        }
      </div>
      <div className="flex items-center gap-5">
        <DatePickerWithPresets deadline={deadline} setDeadline={setDeadline} />
        <div className=" px-4 ">
          <Sheet>
            <SheetTrigger className="flex gap-1">
              <Mail /> Davet Edilenler
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  Ankete Davet Et <UserPlus2 />
                </SheetTitle>
                <SheetDescription>
                  Ankete davet etmek istediğin kişileri seç.
                </SheetDescription>
                <div className="flex flex-col ">
                  <div className="">
                    {" "}
                    <Input
                      className="rounded-b-none border-b-slate-900/70 "
                      placeholder="Davet etmek istediğin kişiyi bul..."
                      onChange={(e) => {
                        setSearchInp(e.target.value);
                        searchUsersArr(e.target.value);
                      }}
                    />
                    <ScrollArea className=" h-40 rounded-lg rounded-t-none border-b border-l border-r">
                      {filteredUsersArr.map((user) => (
                        <div
                          key={user.id}
                          className="mt-3 flex items-center justify-between p-1 px-5  hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                        >
                          <div className="flex h-8 w-8 justify-center   rounded-full  bg-gray-300 font-bold  text-black">
                            <p className="self-center  text-center">
                              {user.name[0].toLocaleUpperCase()}
                              {user.surname[0].toLocaleUpperCase()}
                            </p>
                          </div>
                          <p className="w-[50%] truncate  ">
                            {user.name} {user.surname}
                          </p>
                          <button
                            className="rounded-lg bg-blue-500 px-1 text-white"
                            onClick={() => AddUser(user)}
                          >
                            Davet
                          </button>
                        </div>
                      ))}
                    </ScrollArea>
                    <div className="flex w-full flex-col items-end ">
                      <Button
                        variant="ghost"
                        className=" h-7 p-1 text-blue-500 "
                        onClick={() => {
                          setInvitedUsersArr((prev) => [
                            ...prev,
                            ...filteredUsersArr,
                          ]);
                          setAllUsersArr(
                            allUsersArr.filter((user) => {
                              return !filteredUsersArr.includes(user);
                            }),
                          );
                        }}
                      >
                        Tümünü Seç
                      </Button>
                    </div>
                  </div>
                  <h3 className="pt-5">Davet Ettiklerin</h3>{" "}
                  <div className="flex w-full flex-col items-end ">
                    <Button
                      variant="ghost"
                      className=" h-7  p-1 text-red-600  "
                      onClick={() => RemoveAllUsers()}
                    >
                      Tümünü Sil
                    </Button>
                  </div>
                  <ScrollArea className=" h-40 rounded-lg border ">
                    {invitedUsersArr.map((user: User) => (
                      <div
                        key={user.id}
                        className="mt-3 flex items-center justify-between p-1 px-5  hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                      >
                        <div className="flex h-8 w-8 justify-center   rounded-full  bg-gray-300 font-bold  text-black">
                          <p className="self-center  text-center">
                            {user.name[0].toLocaleUpperCase()}
                            {user.surname[0].toLocaleUpperCase()}
                          </p>
                        </div>
                        <p className="w-[50%] truncate  ">
                          {user.name} {user.surname}
                        </p>
                        <button
                          className="rounded-full  bg-red-500 "
                          onClick={() => RemoveUser(user)}
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <Button
          className="bg-blue-500 text-white"
          onClick={() => {
            Publish();
          }}
        >
          Yayınla
        </Button>
      </div>
    </div>
  );
};

export default SurveyCreationHeader;
