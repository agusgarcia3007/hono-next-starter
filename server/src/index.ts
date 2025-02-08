import { routes } from "@/routes";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { AppEnv } from "@/types/hono";

const app = new Hono<AppEnv>();

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
