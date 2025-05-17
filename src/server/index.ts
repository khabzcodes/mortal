import { Hono } from "hono";
import { notes } from "./routes/notes";
import { noteActivityMiddleware } from "./middlewares/activity";
import { activities } from "./routes/activities";

export const app = new Hono().basePath("/api/rpc");

noteActivityMiddleware()(app);

const routes = app.route("/notes", notes).route("/activities", activities);

export type AppTypes = typeof routes;
