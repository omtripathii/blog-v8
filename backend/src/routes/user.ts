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
        name: data.name
      },
    });
    // Jwt Token Cretion
    const token = await sign(
      { id: user.id, email: user.email },
      c.env.JWT_SECRET
    );
    return c.json({ jwt: token });
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
  
  // Validation
  const { success, data } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
      password: data.password,
    },
  });
  if (!user) {
    return c.text("Invalid Credentials Given");
  }
  // Jwt Token Cretion
  const token = await sign(
    { id: user.id, email: user.email },
    c.env.JWT_SECRET
  );
  return c.json({ jwt: token });
});
