import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "./ui/use-toast";
type Props = {};

const CreateUser = (props: Props) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const CreateUserHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      function adminStatus() {
        return formData.get("role") === "true";
      }
      const formData = new FormData(e.target as HTMLFormElement);
      const name = formData.get("name");
      const surname = formData.get("surname");
      const email = formData.get("email");
      const password = formData.get("password");
      const is_admin = adminStatus();
      const department = formData.get("department");

      const payload = {
        name,
        surname,
        email,
        password,
        is_admin,
        department,
      };
      console.log("CreateUserHandler");
      console.log("payload::", payload);
      await axios.post("http://localhost:5000/auth/register", payload, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setIsOpen(false);
      toast({
        title: "Başarılı!",
        description: "Yeni kullanıcı başarıyla oluşturuldu...",
      });
      navigate("/home");
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Kullanıcı oluşturulamadı. Tekrar deneyiniz.",
        variant: "destructive",
      });
      console.log("error::" + error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start gap-3  text-base"
          variant="ghost"
        >
          <Plus className="mr-1 self-center" />
          Yeni Kullanıcı Oluştur
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-200">
        <DialogHeader>
          <DialogTitle className="text-center">Kullanıcı Oluşturma</DialogTitle>
          <div className="flc flex-col p-2">
            <form
              action=""
              className="flex flex-col gap-2 "
              onSubmit={CreateUserHandler}
            >
              <label htmlFor="name">Kullanıcı Adı</label>
              <input
                type="text"
                id="name"
                name="name"
                className=" rounded-md p-1 text-black"
              />
              <label htmlFor="surname">Kullanıcı Soyadı</label>
              <input
                type="text"
                id="surname"
                name="surname"
                className=" rounded-md p-1 text-black"
              />
              <label htmlFor="email">Kullanıcı E-Postası</label>
              <input
                type="email"
                name="email"
                id="email"
                className=" rounded-md p-1 text-black"
              />
              <label htmlFor="password">Kullanıcı Şifresi</label>
              <input
                type="password"
                id="password"
                name="password"
                className=" rounded-md p-1 text-black"
              />
              <label htmlFor="role">Kullanıcı Rolü</label>
              <select
                id="role"
                name="role"
                className=" rounded-md p-1 text-black"
              >
                <option value="true">Yönetici</option>
                <option value="false">Çalışan</option>
              </select>
              <label htmlFor="department">Kullanıcı Departmanı</label>
              <select
                id="department"
                name="department"
                className=" rounded-md p-1 text-black"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Fullstack">Fullstack</option>
                <option value="DevOps">DevOps</option>
                <option value="HR">İnsan Kaynakları</option>
                <option value="Finance">Finans</option>
                <option value="Sales">Satış</option>
                <option value="Educational">Eğitim</option>
              </select>
              <Button type="submit" variant="ghost">
                Oluştur
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
