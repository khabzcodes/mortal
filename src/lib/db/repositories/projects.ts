import { count, eq } from "drizzle-orm";
import { db } from "..";
import { projects } from "../schemas/projects";
import { ProjectsRepository } from "./interfaces/projects";

export const projectsRepository: ProjectsRepository = {
  insertProject: async (data) => {
    const [project] = await db.insert(projects).values(data).returning();
    return project;
  },
  selectProjectsCountByOrganizationId: async (organizationId) => {
    const [result] = await db
      .select({ count: count() })
      .from(projects)
      .where(eq(projects.organizationId, organizationId));

    return result.count;
  },
  selectProjectById: async (id) => {
    const [project] = await db
      .select()
      .from(projects)
      .where((n) => eq(n.id, id));
    return project;
  },
};
