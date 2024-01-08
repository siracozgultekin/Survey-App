import { MoreVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  DataTableSurveyWithInvitation,
  mySurveySchema,
  participatedSurveySchema,
  surveyWithInvitationSchema,
} from "./data/schema";
import { Link } from "react-router-dom";

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

  function instanceOfSurveyWithInvitation(
    object: any,
  ): object is DataTableSurveyWithInvitation {
    return "invitation" in object;
  }

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
        {!instanceOfSurveyWithInvitation(survey) &&
          tableType === "mySurvey" && (
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to={`/statistic?surveyid=${survey.id}`}>Görüntüle</Link>
            </DropdownMenuItem>
          )}

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
