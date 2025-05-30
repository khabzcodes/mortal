import { Hono } from "hono";

import { auth } from "@/lib/auth";
import { membersRepository } from "@/lib/db/repositories/members";
import { createLogger } from "@/lib/logger";

const logger = createLogger("MembersRoute");

export const members = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session | null;
    member: typeof auth.$Infer.Member | null;
  };
}>().get("/", async (c) => {
  try {
    const session = c.get("session");
    if (!session || !session.session.activeOrganizationId) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const members = await membersRepository.selectMembersByOrganizationId(session.session.activeOrganizationId);

    return c.json({ data: members }, 200);
  } catch (error) {
    logger.error("Error fetching members", error);
    return c.json({ message: "Failed to fetch members" }, 500);
  }
});
