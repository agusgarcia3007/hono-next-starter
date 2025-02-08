import { db } from "@/db";
import { InsertPost, postsTable, usersTable } from "@/db/schema";
import { authMiddleware } from "@/middleware/auth";
import { createPostSchema, updatePostSchema } from "@/schemas/posts";
import { AppEnv } from "@/types/hono";
import {
  DeletePostResponse,
  ErrorResponse,
  PostResponse,
  SelectPostWithAuthor,
} from "@/types/posts";
import { zValidator } from "@hono/zod-validator";
import { desc, eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const posts = new Hono<AppEnv>();

// Get all posts
posts.get("/", async (c) => {
  try {
    const page = Number(c.req.query("page")) || 1;
    const limit = Number(c.req.query("limit")) || 10;
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(postsTable);

    const posts: SelectPostWithAuthor[] = await db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        userId: postsTable.userId,
        author: {
          id: usersTable.id,
          name: usersTable.name,
          email: usersTable.email,
        },
      })
      .from(postsTable)
      .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
      .orderBy(desc(postsTable.createdAt))
      .limit(limit)
      .offset(offset);

    return c.json<PaginatedResponse<SelectPostWithAuthor>>({
      data: posts,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    return c.json<ErrorResponse>({ message: "Failed to fetch posts" }, 500);
  }
});

// Get post by id
posts.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const [post] = await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      content: postsTable.content,
      createdAt: postsTable.createdAt,
      updatedAt: postsTable.updatedAt,
      userId: postsTable.userId,
      author: {
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
      },
    })
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .where(eq(postsTable.id, id));

  if (!post) {
    throw new HTTPException(404, { message: "Post not found" });
  }

  return c.json<PostResponse>({ post });
});

// Create post (protected)
posts.post(
  "/",
  authMiddleware,
  zValidator("json", createPostSchema),
  async (c) => {
    const data = c.req.valid("json");
    const user = c.get("jwtPayload");

    const post: InsertPost = {
      ...data,
      userId: user.id,
    };

    const [newPost] = await db.insert(postsTable).values(post).returning();
    return c.json<PostResponse>({ post: newPost }, 201);
  }
);

// Update post (protected + owner only)
posts.put(
  "/:id",
  authMiddleware,
  zValidator("json", updatePostSchema),
  async (c) => {
    const id = Number(c.req.param("id"));
    const data = c.req.valid("json");
    const user = c.get("jwtPayload");

    const [post] = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.id, id));

    if (!post) {
      throw new HTTPException(404, { message: "Post not found" });
    }

    if (post.userId !== user.id) {
      throw new HTTPException(403, { message: "Unauthorized" });
    }

    const [updatedPost] = await db
      .update(postsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(postsTable.id, id))
      .returning();

    return c.json<PostResponse>({ post: updatedPost });
  }
);

// Delete post (protected + owner only)
posts.delete("/:id", authMiddleware, async (c) => {
  const id = Number(c.req.param("id"));
  const user = c.get("jwtPayload");

  const [post] = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, id));

  if (!post) {
    throw new HTTPException(404, { message: "Post not found" });
  }

  if (post.userId !== user.id) {
    throw new HTTPException(403, { message: "Unauthorized" });
  }

  await db.delete(postsTable).where(eq(postsTable.id, id));
  return c.json<DeletePostResponse>({ message: "Post deleted" }, 200);
});

export { posts };
