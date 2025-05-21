import { auth } from "@/lib/auth";
import { invitationRepository } from "@/lib/db/repositories/invitations";
import { createLogger } from "@/lib/logger";
import { Hono } from "hono";

const logger = createLogger("InvitationsRoute");

export const invitations = new Hono<{
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

    const invitations =
      await invitationRepository.selectInvitationsByOrganizationId(
        session.session.activeOrganizationId
      );

    return c.json({ data: invitations }, 200);
  } catch (error) {
    logger.error("Error fetching invitations", error);
    return c.json({ message: "Failed to fetch invitations" }, 500);
  }
});
