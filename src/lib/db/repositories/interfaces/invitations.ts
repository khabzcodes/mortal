import { invitation } from "@/lib/db/schemas/auth-schema";

type Invitation = typeof invitation.$inferSelect;

export type InvitationRepository = {
  selectInvitationsByOrganizationId(
    organizationId: string
  ): Promise<Invitation[]>;
  selectInvitationByEmailAndOrganizationId(
    email: string,
    organizationId: string
  ): Promise<Invitation | null>;
  insertInvitation(data: Invitation): Promise<Invitation | null>;
};
