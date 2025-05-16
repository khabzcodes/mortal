import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { env } from "@/env";
import * as schema from "@/lib/db/schemas/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    },
    discord: {
      clientId: env.DISCORD_CLIENT_ID!,
      clientSecret: env.DISCORD_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
});
