import { Hono } from "hono";

import { auth } from "@/lib/auth";
import { activities } from "./routes/activities";
import { invitations } from "./routes/invitations";
import { members } from "./routes/members";
import { notes } from "./routes/notes";
import { projects } from "./routes/projects";

export const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session | null;
    member: typeof auth.$Infer.Member | null;
  };
}>().basePath("/api/rpc");

app.on(["GET", "POST", "PUT", "DELETE", "PATCH"], "/api/rpc/*", async (c) => {
  return auth.handler(c.req.raw);
});

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  const member = await auth.api.getActiveMember({ headers: c.req.raw.headers });

  if (!session) {
    c.set("session", null);
    c.set("user", null);
    c.set("member", null);
    return next();
  }
  c.set("session", session);
  c.set("user", session.user);
  c.set("member", member as typeof auth.$Infer.Member);
  return next();
});

const routes = app
  .route("/notes", notes)
  .route("/activities", activities)
  .route("/members", members)
  .route("/invitations", invitations)
  .route("/projects", projects);

export type AppTypes = typeof routes;
