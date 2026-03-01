import { Hono } from "hono";
import { displayPokemons } from "./handler/request_handler.js";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";

export const createApp = (pokemons) => {
  const app = new Hono();
  app.use(logger());
  app.use(async (c, next) => {
    c.set("pokemons", pokemons);
    await next();
  });

  app.on("GET", ["/", "/:type"], displayPokemons);
  app.get("*", serveStatic({ root: "./public" }));
  return app;
};
