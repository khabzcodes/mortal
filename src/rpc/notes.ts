import { baseRpcUrl } from "@/rpc/config";

const routes = baseRpcUrl.notes;

export const getUserNotes = async () => {
  const response = await routes.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch notes");
  }

  const { data } = await response.json();

  return data;
};
