// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  site: "https://hono-next-starter-client.vercel.app/",
  base: "/docs",
});
