import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const baseUrl = process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "https://nodifyhq.vercel.app";

export const authClient = createAuthClient({
  baseUrl,
  plugins: [organizationClient()],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
  useListOrganizations,
  useActiveOrganization,
  organization,
} = authClient;
