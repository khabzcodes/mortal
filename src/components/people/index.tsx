"use client";
import { useQuery } from "@tanstack/react-query";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { QueryKeys } from "@/rpc/query-keys";
import { getWorkspaceMembers } from "@/rpc/members";
import { PeopleDataTable } from "./people-table";
import { columns } from "./columns";

export const PeopleComponent = () => {
  const { data: members, isPending } = useQuery({
    queryKey: [QueryKeys.GET_ORGANIZATION_MEMBERS],
    queryFn: () => getWorkspaceMembers(),
  });
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2>Members</h2>
          <span className="text-xs text-muted-foreground">
            Only people with permission to invite members can add new members.
          </span>
        </div>
        <Button size="sm">
          <Icons.addSquare />
          Add Members
        </Button>
      </div>
      {members?.length ? (
        <PeopleDataTable
          columns={columns}
          data={members.map((person) => ({
            id: person.member.id,
            image: person.user.image || undefined,
            email: person.user.email,
            name: person.user.name,
          }))}
        />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
