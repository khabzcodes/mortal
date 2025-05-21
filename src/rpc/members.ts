import { baseRpcUrl } from "@/rpc/config";

const route = baseRpcUrl.members;

export const getWorkspaceMembers = async () => {
  const response = await route.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch members");
  }

  const { data } = await response.json();
  return data;
};
