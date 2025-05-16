import { Hono } from "hono";
import { notes } from "./routes/notes";

export const app = new Hono().basePath("/api/rpc");

const routes = app.route("/notes", notes);

export type AppTypes = typeof routes;
