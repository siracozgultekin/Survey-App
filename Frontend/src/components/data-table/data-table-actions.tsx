import { MoreVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  invitationSchema,
  mySurveySchema,
  participatedSurveySchema,
  surveyWithInvitationSchema,
} from "./data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  tableType: "mySurvey" | "participatedSurvey" | "invitation";
}

export function DataTableRowActions<TData>({
  row,
  tableType,
}: DataTableRowActionsProps<TData>) {
  const survey =
    tableType === "mySurvey"
      ? mySurveySchema.parse(row.original)
      : tableType === "participatedSurvey"
      ? participatedSurveySchema.parse(row.original)
      : surveyWithInvitationSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => console.log(survey)}>
          Düzenle
        </DropdownMenuItem>

        <DropdownMenuItem>
          {tableType === "mySurvey" && "Katılımcıları düzenle"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Sil
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
