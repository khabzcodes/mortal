import { baseRpcUrl } from "@/rpc/config";

const route = baseRpcUrl.activities;

export const getUserActivitySummary = async () => {
  const response = await route.summary.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch activity summary");
  }

  const { data } = await response.json();
  return data;
};
