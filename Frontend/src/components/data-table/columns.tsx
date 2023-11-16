import { ColumnDef } from "@tanstack/react-table";
import { DataTableParticipatedSurvey, DataTableSurvey } from "./data/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "./data-table-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatISOToCustomString } from "@/lib/stringToDate";
import { statuses } from "./data/data";

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
