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
import { ModeToggle } from "./mode-toggle";

const Setting = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start gap-3  text-base"
          variant="ghost"
        >
          <Settings className="h-5 w-5" />
          Ayarlar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ayarlar</DialogTitle>
          <DialogDescription>Tema Seçimi</DialogDescription>
          <ModeToggle />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Setting;
