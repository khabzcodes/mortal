"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { columns as invitationCols } from "@/components/invitations/columns";
import { getWorkspaceInvitations } from "@/rpc/invitations";
import { getWorkspaceMembers } from "@/rpc/members";
import { QueryKeys } from "@/rpc/query-keys";
import { Icons } from "../icons";
import { InvitationsDataTable } from "../invitations/invitations-table";
import { InviteMemberModal } from "../invitations/invite-member-modal";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { columns } from "./columns";
import { PeopleDataTable } from "./people-table";

export const PeopleComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: members } = useQuery({
    queryKey: [QueryKeys.GET_ORGANIZATION_MEMBERS],
    queryFn: () => getWorkspaceMembers(),
  });

  const { data: invitations } = useQuery({
    queryKey: [QueryKeys.GET_ORGANIZATION_INVITATIONS],
    queryFn: () => getWorkspaceInvitations(),
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
        <Button size="sm" onClick={() => setIsOpen(true)}>
          <Icons.addSquare />
          Add Members
        </Button>
      </div>
      {members ? (
        <PeopleDataTable
          columns={columns}
          data={members.map((person) => ({
            id: person.member.id,
            image: person.user.image || undefined,
            email: person.user.email,
            name: person.user.name,
            role: person.member.role,
          }))}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2>Invitations</h2>
          <span className="text-xs text-muted-foreground">Manage and track invitations to your workspace.</span>
        </div>
      </div>
      {invitations ? (
        <InvitationsDataTable
          columns={invitationCols}
          data={invitations.map((invitation) => ({
            id: invitation.id,
            email: invitation.email,
            role: invitation.role || "member",
            status: invitation.status,
            expiresAt: invitation.expiresAt,
          }))}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      )}
      <InviteMemberModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
