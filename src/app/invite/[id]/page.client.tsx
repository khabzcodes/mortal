import { useEffect } from "react";

import { organization } from "@/lib/auth-client";

interface AcceptInviteClientProps {
  invitationId: string;
}

export const AcceptInviteClient = ({ invitationId }: AcceptInviteClientProps) => {
  useEffect(() => {
    const acceptInvite = async () => {
      const invite = organization.getInvitation({
        query: {
          id: invitationId,
        },
      });
    };
  }, [invitationId]);

  return (
    <div>
      <h1>Accept Invite</h1>
      <p>Invitation ID: {invitationId}</p>
    </div>
  );
};
