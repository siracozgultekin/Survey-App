import { ColumnDef } from "@tanstack/react-table";
import {
  DataTableInvitation,
  DataTableParticipatedSurvey,
  DataTableSurvey,
  DataTableSurveyWithInvitation,
} from "./data/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "./data-table-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatISOToCustomString } from "@/lib/stringToDate";
import { statuses } from "./data/data";
import { Check, Hourglass } from "lucide-react";
import { link } from "fs";
import { Link, useNavigate } from "react-router-dom";

//mysurvey ve participated survey için ayrı columnlar oluşturman lazım.
export const mySurveyColumns: ColumnDef<DataTableSurvey>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Başlık" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "creation_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Oluşturma Tarihi" />
    ),
    cell: ({ row }) => {
      const { datePart } = formatISOToCustomString(
        row.getValue("creation_date"),
      );

      return (
        <div className="flex max-w-[500px] flex-col font-medium">
          <span>{datePart}</span>
        </div>
      );
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bitiş Tarihi" />
    ),
    cell: ({ row }) => {
      const { datePart } = formatISOToCustomString(row.getValue("deadline"));

      return (
        <div className="flex max-w-[500px] flex-col font-medium">
          <span>{datePart}</span>
        </div>
      );
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "numberOfParticipants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Katılımcı Sayısı" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("numberOfParticipants")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Durum" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} tableType="mySurvey" />,
  },
];
export const participatedSurveyColumns: ColumnDef<DataTableParticipatedSurvey>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Başlık" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "owner_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Oluşturan" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("owner_name")}
            </span>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "deadline",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bitiş Tarihi" />
      ),
      cell: ({ row }) => {
        const { datePart } = formatISOToCustomString(row.getValue("deadline"));

        return (
          <div className="flex max-w-[500px] flex-col font-medium">
            <span>{datePart}</span>
          </div>
        );
      },
      sortingFn: "datetime",
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Durum" />
      ),
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue("status"),
        );

        if (!status) {
          return null;
        }

        return (
          <div className="flex w-[100px] items-center">
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{status.label}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions row={row} tableType="participatedSurvey" />
      ),
    },
  ];

export const SurveyWithInvitationColumn: ColumnDef<DataTableSurveyWithInvitation>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Başlık" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "deadline",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bitiş Tarihi" />
      ),
      cell: ({ row }) => {
        let deadline: string = row.getValue("deadline");
        //reverse the deadline

        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {deadline.slice(0, 10)}
            </span>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "state",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Durum" />
      ),
      cell: ({ row }) => {
        if (!row.getValue("state")) {
          return (
            <div className="flex w-[100px] items-center justify-center gap-2 rounded-lg bg-gray-200 p-1 text-center text-yellow-400 dark:bg-slate-800">
              Bekliyor <Hourglass className="h-4 w-4" />
            </div>
          );
        } else {
          return (
            <div className="flex w-[100px] items-center justify-center gap-2 rounded-lg bg-gray-200 p-1 text-center text-green-400 dark:bg-slate-800">
              Tamamlandı <Check className="h-4 w-4" />
            </div>
          );
        }
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: ({ row }) => {
        //reverse the deadline

        return (
          <div className="flex space-x-2">
            <Link
              to={"/survey-answer/" + row.getValue("id")}
              className="max-w-[500px] truncate font-medium"
            >
              KATIL
              {
                // Anketi çözme sayfasına yönlendirecek (anketin id üzerinden).
              }
            </Link>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    // actions invitation tabllosu için Hata veriyor??
    // {
    //   id: "actions",
    //   cell: ({ row }) => (
    //     <DataTableRowActions row={row} tableType="invitation" />
    //   ),
    // },
  ];
