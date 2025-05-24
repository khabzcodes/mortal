import { auth } from "@/lib/auth";
import { getSession } from "./auth-client";

export const getUser = async () => {
  const session = await getSession();
  return session.data?.user;
};
