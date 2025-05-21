import { eq } from "drizzle-orm";
import { db } from "..";
import { member, user } from "../schemas/auth-schema";
import { MembersRepository } from "./interfaces/members";

export const membersRepository: MembersRepository = {
  selectMembersByOrganizationId: async (organizationId: string) => {
    const members = await db
      .select({
        member,
        user,
      })
      .from(member)
      .innerJoin(user, eq(member.userId, user.id))
      .where(eq(member.organizationId, organizationId));

    return members;
  },
};
