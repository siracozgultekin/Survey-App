import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/use-user-store";
import axios, { AxiosError } from "axios";
import { useToast } from "./ui/use-toast";
type Props = {};

const ChangePassword = (props: Props) => {
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();

  const PasswordHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const oldPassword = formData.get("oldpass");
    const newPassword = formData.get("newpass");
    const newPasswordConfirm = formData.get("newpass2");

    if (newPassword !== newPasswordConfirm) {
      toast({
        title: "Hata!",
        description: "Yeni şifreler uyuşmuyor. Tekrar deneyiniz.",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = Cookies.get("token");

      const payload = {
        oldPassword,
        newPassword,
      };

      const response = await axios.post(
        "http://localhost:5000/updatepassword",
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Hata!",
          description: error.response?.data.error,
          variant: "destructive",
        });
        console.log(error.response?.data);
      }
    }

    // if (newPassword !== newPassword2) {
    //   alert("Şifreler Uyuşmuyor");
    //   return;
    // }
    // const response = await fetch("http://localhost:5000/updatepassword", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: user?.id,
    //     oldPassword,
    //     newPassword,
    //   }),
    // });
    // if (response.status === 200) {
    //   alert("Şifre Değiştirildi");
    // } else {
    //   alert("Şifre Değiştirilemedi,nedeni: " + response.statusText);
    // }
  };
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start gap-3  text-lg text-primary"
          variant="ghost"
        >
          Şifreyi Değiştir
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="self-center">Şifre Değiştirme</DialogTitle>
        </DialogHeader>
        <div>
          <form
            action=""
            className="flex flex-col gap-5 px-5 text-[15px]"
            onSubmit={PasswordHandler}
          >
            <label htmlFor="oldpass">Eski şifreniz</label>
            <input
              type="password"
              name="oldpass"
              id="oldpass"
              className="rounded-md bg-gray-200 py-1 text-black dark:bg-slate-800 dark:text-white"
            />
            <label htmlFor="newpass">Yeni şifreniz</label>
            <input
              type="password"
              name="newpass"
              id="newpass"
              className="rounded-md bg-gray-200 py-1 text-black dark:bg-slate-800 dark:text-white"
            />
            <label htmlFor="newpass2">Yeni şifreniz (tekrar)</label>
            <input
              type="password"
              id="newpass2"
              name="newpass2"
              className="rounded-md bg-gray-200 py-1 text-black dark:bg-slate-800 dark:text-white"
            />
            <button
              type="submit"
              className="w-fit self-center rounded-lg bg-gray-100 p-2 hover:bg-gray-200 dark:bg-slate-900 dark:hover:bg-slate-800 "
            >
              Şifreyi Değiştir
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
