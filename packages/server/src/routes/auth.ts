import { db } from "@/db";
import { InsertUser, SelectUser, usersTable } from "@/db/schema";
import { loginSchema, signupSchema } from "@/schemas/auth";
import { ErrorResponse, LoginResponse, SignupResponse } from "@/types/auth";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { authMiddleware } from "@/middleware/auth";
import { AppEnv } from "@/types/hono";

const auth = new Hono<AppEnv>();

const JWT_SECRET = Bun.env.JWT_SECRET || "";

auth.post(
  "/signup",
  zValidator("json", signupSchema),
  async (c): Promise<Response> => {
    const data: InsertUser = c.req.valid("json");

    try {
      const existingUser: SelectUser[] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, data.email));

      if (existingUser.length > 0) {
        return c.json<ErrorResponse>({ message: "Email already exists" }, 400);
      }

      const hashedPassword: string = await Bun.password.hash(data.password);

      const newUser: SelectUser[] = await db
        .insert(usersTable)
        .values({ ...data, password: hashedPassword })
        .returning();

      const token: string = await sign(
        {
          id: newUser[0].id,
          email: newUser[0].email,
        },
        JWT_SECRET
      );

      const { password, ...userWithoutPassword } = newUser[0];

      return c.json<SignupResponse>({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.log(error);
      return c.json<ErrorResponse>({ message: "Error creating user" }, 500);
    }
  }
);

auth.post(
  "/login",
  zValidator("json", loginSchema),
  async (c): Promise<Response> => {
    const { email, password }: { email: string; password: string } =
      c.req.valid("json");

    try {
      const users: SelectUser[] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (users.length === 0) {
        return c.json<ErrorResponse>({ message: "Invalid credentials" }, 400);
      }

      const user: SelectUser = users[0];

      const isValidPassword: boolean = await Bun.password.verify(
        password,
        user.password
      );

      if (!isValidPassword) {
        return c.json<ErrorResponse>({ message: "Invalid credentials" }, 400);
      }

      const token: string = await sign(
        {
          id: user.id,
          email: user.email,
        },
        JWT_SECRET
      );

      const { password: _, ...userWithoutPassword } = user;

      return c.json<LoginResponse>({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      return c.json<ErrorResponse>({ message: "Error logging in" }, 500);
    }
  }
);

export { auth };
