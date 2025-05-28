import { auth } from "@/lib/auth";
import { projectsRepository } from "@/lib/db/repositories/projects";
import { createLogger } from "@/lib/logger";
import { Project } from "@/types/projects";
import { getProjectsSchema } from "@/validations/projects";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { nanoid } from "nanoid";

const logger = createLogger("ProjectsRoute");

export const projects = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session | null;
    member: typeof auth.$Infer.Member | null;
  };
}>()
  .post("/", async (c) => {
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
  })
  .get("/", async (c) => {
    try {
      const session = c.get("session");
      if (!session || !session.session.activeOrganizationId) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      // const { limit } = c.req.valid("json");

      const projects = await projectsRepository.selectProjectsByOrganizationId(
        session.session.activeOrganizationId,
        4
      );

      return c.json({ data: projects }, 200);
    } catch (error) {
      logger.error("Error fetching projects", error);
      return c.json({ message: "Failed to fetch projects" }, 500);
    }
  })
  .get("/:id", async (c) => {
    try {
      const session = c.get("session");
      if (!session || !session.session.activeOrganizationId) {
        return c.json({ message: "Unauthorized" }, 401);
      }
      const projectId = c.req.param("id");

      const project = await projectsRepository.selectProjectById(projectId);
      if (
        !project ||
        project.organizationId !== session.session.activeOrganizationId
      ) {
        return c.json({ message: "Project not found" }, 404);
      }

      return c.json({ data: project }, 200);
    } catch (error) {
      logger.error("Error fetching project", error);
      return c.json({ message: "Failed to fetch project" }, 500);
    }
  });
