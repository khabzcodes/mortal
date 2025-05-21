import { invitation } from "@/lib/db/schemas/auth-schema";

type Invitation = typeof invitation.$inferSelect;

export type InvitationRepository = {
  selectInvitationsByOrganizationId(
    organizationId: string
  ): Promise<Invitation[]>;
};
