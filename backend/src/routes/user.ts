import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@om.tripathi/medium-common";

export const userRouter = new Hono<{
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

// Setting Prima Client for all the routes using the middleware
// userRouter.use("*", async (c, next) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set("prisma", prisma);
//   await next();
// });

/**
 * Add Hashing into the password
 * Add the cookie based token storage
 */

// Signup
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  // Validation
  const { success, data } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });
    // Jwt Token Cretion
    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);
    // console.log('Generated token for signup - userId:', user.id); // Debug log
    return c.json({
      message: "User created successfully",
      token: token,
    });
  } catch (error: any) {
    return c.text(`Something Went Wrong: ${error.message}`);
  }
});

// Signin
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  // console.log('Signin request body:', body); // Debug log

  // Validation
  const { success, data } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  try {
    // Fix: Use separate where conditions instead of combining them
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password, // i need to hash passwords alsp
      },
    });

    // console.log('User found:', user ? 'yes' : 'no'); // Debug log

    if (!user) {
      return c.json({ error: "Invalid Credentials Given" }, 401);
    }

    // JWT Token Creation
    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);
    // console.log('Generated token for signin - userId:', user.id); // Debug log

    return c.json({
      message: "User signed in successfully",
      token: token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return c.json({ error: `Something went wrong: ${error}` }, 500);
  }
});
