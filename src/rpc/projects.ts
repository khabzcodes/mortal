import { baseRpcUrl } from "@/rpc/config";
import { UpdateProjectInputValidation, UpdateProjectOverviewInputValidation } from "@/validations/projects";

const route = baseRpcUrl.projects;

export const createProject = async () => {
  const response = await route.$post();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create project");
  }

  const { data } = await response.json();
  return data;
};

export const getProject = async (id: string) => {
  const response = await route[":id"].$get({ param: { id } });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch project");
  }

  const { data } = await response.json();
  return data;
};

export const getProjects = async (limit?: number) => {
  const response = await route.$get();

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch projects");
  }

  const { data } = await response.json();
  return data;
};

export const updateProject = async (id: string, data: UpdateProjectInputValidation) => {
  const response = await route[":id"].$put({ param: { id }, json: data });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update project");
  }

  const { data: project } = await response.json();
  return project;
};

export const updateProjectOverview = async (id: string, data: UpdateProjectOverviewInputValidation) => {
  const response = await route[":id"].overview.$put({
    param: { id },
    json: data,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update project overview");
  }

  const { data: project } = await response.json();
  return project;
};
