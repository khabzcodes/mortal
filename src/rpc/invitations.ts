import { baseRpcUrl } from "@/rpc/config";

const route = baseRpcUrl.invitations;

export const getWorkspaceInvitations = async () => {
  const response = await route.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch invitations");
  }

  const { data } = await response.json();
  return data;
};
