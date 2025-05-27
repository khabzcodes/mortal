import { auth } from "@/lib/auth";
import { projectsRepository } from "@/lib/db/repositories/projects";
import { createLogger } from "@/lib/logger";
import { Project } from "@/types/projects";
import { Hono } from "hono";
import { nanoid } from "nanoid";

const logger = createLogger("ProjectsRoute");

export const projects = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session | null;
    member: typeof auth.$Infer.Member | null;
  };
}>().post("/", async (c) => {
  try {
    const session = c.get("session");
    if (!session || !session.session.activeOrganizationId) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const projectsCount =
      await projectsRepository.selectProjectsCountByOrganizationId(
        session.session.activeOrganizationId
      );

    const projectData: Project = {
      id: `proj_${nanoid(24)}`,
      name: projectsCount > 0 ? `Untitled ${projectsCount + 1}` : "Untitled",
      organizationId: session.session.activeOrganizationId,
      createdById: session.session.userId,
    };

    const project = await projectsRepository.insertProject(projectData);

    return c.json({ data: project }, 201);
  } catch (error) {
    logger.error("Error creating project", error);
    return c.json({ message: "Failed to create project" }, 500);
  }
});
