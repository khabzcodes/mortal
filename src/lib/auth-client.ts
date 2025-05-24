import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://nodifyhq.vercel.app"
    : "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
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
