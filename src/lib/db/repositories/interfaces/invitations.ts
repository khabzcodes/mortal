import { invitation, organization } from "@/lib/db/schemas/auth-schema";

type Invitation = typeof invitation.$inferSelect;
type InvitationWithOrganization = {
  invitation: Invitation;
  organization: typeof organization.$inferSelect;
};

export type InvitationRepository = {
  selectInvitationsByOrganizationId(
    organizationId: string
  ): Promise<Invitation[]>;
  selectInvitationByEmailAndOrganizationId(
    email: string,
    organizationId: string
  ): Promise<Invitation | null>;
  selectInvitationById(id: string): Promise<InvitationWithOrganization | null>;
  insertInvitation(data: Invitation): Promise<Invitation | null>;
};
