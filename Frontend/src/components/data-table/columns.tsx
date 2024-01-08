import { ColumnDef } from "@tanstack/react-table";
import {
  DataTableParticipatedSurvey,
  DataTableSurvey,
  DataTableSurveyWithInvitation,
} from "./data/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "./data-table-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatISOToCustomString } from "@/lib/stringToDate";
import { statuses } from "./data/data";
import { Check, Hourglass, XCircle } from "lucide-react";

import { Button } from "../ui/button";
import { Link } from "react-router-dom";

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
      <div className="flex justify-center  ">
        <DataTableColumnHeader column={column} title="Katılımcı Sayısı" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2  text-center">
          <span className="w-full max-w-[500px] truncate  text-center font-medium">
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
      accessorKey: "nameSurname",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Oluşturan" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("nameSurname")}
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
        <DataTableColumnHeader column={column} title="Oluşturulma Tarihi" />
      ),
      cell: ({ row }) => {
        let deadline: Date = new Date(row.getValue("creation_date"));
        // Tarih formatını gün/ay/yıl olarak düzenleme
        let formattedDeadline = `${deadline.getUTCDate()}/${
          deadline.getUTCMonth() + 1
        }/${deadline.getUTCFullYear()}`;

        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {formattedDeadline}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "deadline",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bitiş Tarihi" />
      ),
      cell: ({ row }) => {
        let deadline: Date = new Date(row.getValue("deadline"));
        // Tarih formatını gün/ay/yıl olarak düzenleme
        let formattedDeadline = `${deadline.getUTCDate()}/${
          deadline.getUTCMonth() + 1
        }/${deadline.getUTCFullYear()}`;

        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {formattedDeadline}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "state",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Durum" />
      ),
      cell: ({ row }) => {
        if (!row.getValue("state")) {
          let deadline: string = row.getValue("deadline");
          let deadlineDate = new Date(deadline); // Dizeyi Date nesnesine dönüştür

          // Anketin bitiş tarihini geçip geçmediğini kontrol et
          if (deadlineDate < new Date()) {
            return (
              <div className="flex w-[100px] items-center justify-center gap-2 rounded-lg bg-gray-200  p-1 text-center text-red-400 dark:bg-slate-800">
                Geçti <XCircle className="h-4 w-4" />
              </div>
            );
          } else {
            return (
              <div className="flex w-[100px] items-center justify-center gap-2 rounded-lg bg-gray-200 p-1 text-center text-yellow-400 dark:bg-slate-800">
                Bekliyor <Hourglass className="h-4 w-4" />
              </div>
            );
          }
        } else {
          return (
            <div className="flex w-[100px] items-center justify-center gap-2 rounded-lg bg-gray-200 p-1 text-center text-green-400 dark:bg-slate-800">
              Tamamlandı <Check className="h-4 w-4" />
            </div>
          );
        }
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: ({ row }) => {
        //reverse the deadline
        let deadline: string = row.getValue("deadline");
        let deadlineDate = new Date(deadline);

        return (
          <Button
            className="m-0 flex items-center justify-center rounded-lg border border-gray-300 bg-gray-200 p-0 text-center dark:bg-slate-900"
            disabled={deadlineDate < new Date() || row.getValue("state")}
          >
            <Link
              to={
                "/survey-answer/" +
                row.getValue("id") +
                "/" +
                row.original.invitation_id
              }
              className="flex h-full w-[full] max-w-[500px] truncate  p-2 font-medium text-slate-900 hover:text-gray-100 dark:text-gray-100 dark:hover:text-slate-900"
              //linki disable yap.
            >
              KATIL
              {
                // Anketi çözme sayfasına yönlendirecek (anketin id üzerinden).
              }
            </Link>
          </Button>
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
