import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { HTTPException } from "hono/http-exception";
import { JWTPayload } from "@/types/jwt";

const JWT_SECRET = Bun.env.JWT_SECRET || "";

declare module "hono" {
  interface ContextVariableMap {
    jwtPayload: JWTPayload;
  }
}

export const authMiddleware = async (c: Context, next: Next) => {
  const authorization = c.req.header("authorization");
  if (!authorization) {
    throw new HTTPException(401, { message: "No authorization header" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    throw new HTTPException(401, { message: "No token provided" });
  }

  try {
    const payload = await verify(token, JWT_SECRET) as JWTPayload;
    c.set("jwtPayload", payload);
    await next();
  } catch (err) {
    throw new HTTPException(401, { message: "Invalid token" });
  }
};
