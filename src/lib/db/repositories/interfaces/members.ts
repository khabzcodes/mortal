import { MemberWithUser } from "@/types/members";

export type MembersRepository = {
  selectMembersByOrganizationId(
    organizationId: string
  ): Promise<MemberWithUser[]>;
};
