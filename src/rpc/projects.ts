import { baseRpcUrl } from "@/rpc/config";

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
