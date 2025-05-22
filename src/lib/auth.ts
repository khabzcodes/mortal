import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { db } from "./db";
import { env } from "@/env";
import * as schema from "@/lib/db/schemas/auth-schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

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
  },
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await auth.api.createOrganization({
            body: {
              name: user.name ? `${user.name}'s Organization` : "Personal",
              slug: `${nanoid(12)}`,
              userId: user.id,
            },
          });
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          const [dbSession] = await db
            .select()
            .from(schema.session)
            .where((s) => eq(s.userId, session.userId));
          if (dbSession && !dbSession.activeOrganizationId) {
            const [member] = await db
              .select()
              .from(schema.member)
              .where((o) => eq(o.userId, session.userId));
            if (member) {
              await db
                .update(schema.session)
                .set({
                  activeOrganizationId: member.organizationId,
                })
                .where(eq(schema.session.id, session.id));
            }
          }
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
