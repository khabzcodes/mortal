import { and, eq } from "drizzle-orm";
import { db } from "..";
import { invitation } from "../schemas/auth-schema";
import { InvitationRepository } from "./interfaces/invitations";

export const invitationRepository: InvitationRepository = {
  selectInvitationsByOrganizationId: async (organizationId: string) => {
    return await db
      .select()
      .from(invitation)
      .where(eq(invitation.organizationId, organizationId));
  },
  selectInvitationByEmailAndOrganizationId: async (
    email: string,
    organizationId: string
  ) => {
    const [invite] = await db
      .select()
      .from(invitation)
      .where(
        and(
          eq(invitation.email, email),
          eq(invitation.organizationId, organizationId)
        )
      );

    return invite;
  },
  insertInvitation: async (invitationData) => {
    const [invite] = await db
      .insert(invitation)
      .values(invitationData)
      .returning();

    return invite;
  },
};
