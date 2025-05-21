"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../shared/datatable-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export type Person = {
  id: string;
  image: string | undefined;
  email: string;
  name: string;
  role: string;
};

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = row.original.name;
      const image = row.original.image;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-xl">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="rounded-lg">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium leading-tight">{name}</span>
        </div>
      );
    },
  },
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
];
