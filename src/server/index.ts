import { Hono } from "hono";
import { notes } from "./routes/notes";
import { noteActivityMiddleware } from "./middlewares/activity";

export const app = new Hono().basePath("/api/rpc");

noteActivityMiddleware()(app);

const routes = app.route("/notes", notes);

export type AppTypes = typeof routes;
