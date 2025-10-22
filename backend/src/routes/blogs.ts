import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    email: string;
    prisma: any;
  };
}>();

// blogRouter.use("*", async (c, next) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set("prisma", prisma);
//   await next();
// });

/**
 * Add Pagination onto the Blogs 
 */

// Middlewares for The Auth Route
blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({
      error: "Unauthorized",
    });
  }
  c.set("userId", payload.id as string);
  c.set("email", payload.email as string);
  await next();
});

// Fetching All Blogs - MOVED BEFORE /:id route
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.post.findMany({});
    return c.json({
      blogs,
    });
  } catch (error) {
    return c.text(`Something Went Wrong ${error}`);
  }
});

// Fething blog by id
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return c.json({
      blog,
    });
  } catch (error) {
    return c.text(`Something Went Wrong ${error}`);
  }
});

//Create Blog
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get("userId");
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (error) {
    c.status(500);
    return c.text(`Something Went Wrong ${error}`);
  }
});

//Modify Blog
blogRouter.patch("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const id = c.req.param("id");
    const userId = c.get("userId");
    
    // check if the blog exists and belongs to same user
    const existingBlog = await prisma.post.findFirst({
      where: {
        id: id,
        authorId: userId,
      },
    });
    
    if (!existingBlog) {
      c.status(404);
      return c.json({ error: "Blog not found or you don't have permission to modify it" });
    }
    
    const modifiedBlog = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: modifiedBlog.id,
      msg: "Blog Modified",
    });
  } catch (error) {
    return c.text(`Something Went Wrong ${error}`);
  }
});
