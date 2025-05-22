import { auth } from "@/lib/auth";
import { invitationRepository } from "@/lib/db/repositories/invitations";
import { createLogger } from "@/lib/logger";
import { createInvitationSchema } from "@/validations/invitations";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { nanoid } from "nanoid";
import { ZodError } from "zod";

const logger = createLogger("InvitationsRoute");

export const invitations = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session | null;
    member: typeof auth.$Infer.Member | null;
  };
}>()
  .get("/", async (c) => {
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
  })
  .get("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const session = c.get("session");
      if (!session || !session.session.userId) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const response = await invitationRepository.selectInvitationById(id);
      if (!response) {
        return c.json({ message: "Invitation not found" }, 404);
      }

      if (response.invitation.email !== session.user.email) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      return c.json({ data: response }, 200);
    } catch (error) {
      logger.error("Error fetching invitation", error);
      return c.json({ message: "Failed to fetch invitation" }, 500);
    }
  })
  .post("/", zValidator("json", createInvitationSchema), async (c) => {
    try {
      const { email, role } = c.req.valid("json");

      const session = c.get("session");
      if (!session || !session.session.activeOrganizationId) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const member = c.get("member");
      if (!member) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const inviteExists =
        await invitationRepository.selectInvitationByEmailAndOrganizationId(
          email,
          session.session.activeOrganizationId
        );
      if (inviteExists) {
        return c.json(
          { message: "Invitation already exists for this email" },
          400
        );
      }

      const invitation = await invitationRepository.insertInvitation({
        id: nanoid(12),
        email,
        role: role,
        status: "pending",
        organizationId: session.session.activeOrganizationId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        inviterId: session.session.userId,
      });

      if (!invitation) {
        return c.json({ message: "Failed to create invitation" }, 500);
      }

      return c.json({ data: invitation }, 201);
    } catch (error) {
      logger.error("Error creating invitation", error);
      if (error instanceof ZodError) {
        return c.json({ message: error.errors[0].message }, 400);
      }

      return c.json({ message: "Failed to create invitation" }, 500);
    }
  });
