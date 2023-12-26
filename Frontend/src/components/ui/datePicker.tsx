"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//get props from DatePickerWithPresets as deadline
type Props = {
  deadline: Date;
  setDeadline: (deadline: Date) => void;
};

export function DatePickerWithPresets({ deadline, setDeadline }: Props) {
  const Handlers = (e: Date) => {
    setDeadline(e as Date);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-start text-left font-normal",
            !deadline && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {deadline ? format(deadline, "PPP") : <span>Bitiş Tarihi</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDeadline(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Kısayol" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Bugün</SelectItem>
            <SelectItem value="1">Yarın</SelectItem>
            <SelectItem value="3">3 Günlük</SelectItem>
            <SelectItem value="7">1 Haftalık</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={deadline}
            onSelect={(e) => {
              if (e instanceof Date && e > new Date()) {
                Handlers(e);
              }
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
