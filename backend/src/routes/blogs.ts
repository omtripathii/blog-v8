import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@om.tripathi/medium-common";

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
  try {
    const authHeader = c.req.header("Authorization");
    // console.log("Auth header:", authHeader); // Debug log

    if (!authHeader) {
      console.log("No authorization header found");
      return c.json({ error: "Authorization header is required" }, 401);
    }

    if (!authHeader.startsWith("Bearer ")) {
      console.log("Invalid authorization header format");
      return c.json({ error: "Bearer token required" }, 401);
    }

    const token = authHeader.substring(7);
    // console.log("Extracted token:", token ? "exists" : "null/undefined");

    if (!token || token === "null" || token === "undefined") {
      console.log("Token is null or undefined");
      return c.json({ error: "Invalid token" }, 401);
    }

    const decoded = await verify(token, c.env.JWT_SECRET);
    // console.log("Decoded payload:", decoded);

    const userId = decoded.id || decoded.userId;

    if (!userId) {
      console.log("No id or userId found in token payload");
      return c.json({ error: "Invalid token payload" }, 401);
    }

    // console.log("Token decoded successfully for user:", userId);
    c.set("userId", userId as string);

    await next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return c.json({ error: "Invalid or expired token" }, 401);
  }
});

//Logged In User Details
blogRouter.get("/userDetails", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    // console.log("UserId from context:", userId); // Debug log

    if (!userId) {
      return c.json({ error: "User ID not found in context" }, 401);
    }

    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
      },
    });

    if (!userDetails) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(userDetails); // Return userDetails directly, not wrapped
  } catch (error) {
    console.error("Error fetching user details:", error);
    return c.json({ error: `Something Went Wrong: ${error}` }, 500);
  }
});

// Fetching All Blogs - MOVED BEFORE /:id route
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        published: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return c.json({ error: `Something Went Wrong: ${error}` }, 500);
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

  // Validation
  const { success, data } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  const authorId = c.get("userId");
  try {
    const blog = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
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

    // Validation
    const { success, data } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "Invalid input" });
    }

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
      return c.json({
        error: "Blog not found or you don't have permission to modify it",
      });
    }

    const modifiedBlog = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        content: data.content,
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
