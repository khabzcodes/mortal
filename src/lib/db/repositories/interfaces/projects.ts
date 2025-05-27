import { Project } from "@/types/projects";

export type ProjectsRepository = {
  insertProject: (
    data: Omit<Project, "createdAt" | "updatedAt">
  ) => Promise<Project>;
  selectProjectsCountByOrganizationId: (
    organizationId: string
  ) => Promise<number>;
  selectProjectById: (id: string) => Promise<Project | null>;
};
