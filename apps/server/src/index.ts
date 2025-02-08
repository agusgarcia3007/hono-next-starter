import { routes } from "@/routes";
import { AppEnv } from "@/types/hono";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { handle } from "hono/vercel";

const app = new Hono<AppEnv>().basePath("/api");

app.use(logger()).use(cors()).use(prettyJSON());

routes.forEach((route) => {
  app.route(route.path, route.router);
});

app.get("/", (c) => {
  return c.json({ status: "ok", timestamp: Date.now() });
});

export default {
  fetch: app.fetch,
  port: Bun.env.PORT,
};

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
