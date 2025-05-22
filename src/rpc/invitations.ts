import { baseRpcUrl } from "@/rpc/config";
import { CreateInvitationInputValidation } from "@/validations/invitations";

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

export const createInvitation = async (
  data: CreateInvitationInputValidation
) => {
  const response = await route.$post({ json: data });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create invitation");
  }

  const { data: invitation } = await response.json();
  return invitation;
};
