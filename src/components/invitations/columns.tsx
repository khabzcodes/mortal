"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../shared/datatable-column-header";

type Invitation = {
  id: string;
  email: string;
  status: string;
  role: string;
  expiresAt: string;
};

export const columns: ColumnDef<Invitation>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email = row.original.email;

      return <span className="text-sm font-medium leading-tight">{email}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span className="text-sm font-medium leading-tight capitalize">
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.original.role;

      return (
        <span className="text-sm font-medium leading-tight capitalize">
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expires At" />
    ),
    cell: ({ row }) => {
      const expiresAt = row.original.expiresAt;

      return (
        <span className="text-sm font-medium leading-tight">{expiresAt}</span>
      );
    },
  },
];
