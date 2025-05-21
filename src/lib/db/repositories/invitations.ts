import { eq } from "drizzle-orm";
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
};
