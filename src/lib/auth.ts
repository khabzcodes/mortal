import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";
import { nanoid } from "nanoid";

import { env } from "@/env";
import * as schema from "@/lib/db/schemas/auth-schema";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  baseUrl: process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "https://nodifyhq.vercel.app",
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day
    freshAge: 60 * 60 * 24 * 30, // 30 days
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await auth.api.createOrganization({
            body: {
              name: user.name ? `${user.name}'s Workspace` : "Personal",
              slug: `${nanoid(12)}`,
              userId: user.id,
            },
          });
        },
      },
    },
  },
  plugins: [
    nextCookies(),
    organization({
      allowUserToCreateOrganization: true,
    }),
  ],
});
