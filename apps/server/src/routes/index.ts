import { auth } from "@/routes/auth";
import { posts } from "@/routes/posts";
import { AppEnv } from "@/types/hono";
import { Hono } from "hono";

interface Route {
  router: Hono<AppEnv>;
  path: string;
}

export const routes: Route[] = [
  {
    router: auth,
    path: "/auth",
  },
  {
    router: posts,
    path: "/posts",
  },
];
