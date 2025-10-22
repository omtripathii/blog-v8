import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

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

  // Input Validation
  interface GetCredentialsType {
    email: string;
    password: string;
  }

  const getCredentials: GetCredentialsType = await c.req.json();
  const { email, password } = getCredentials;
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
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

  interface GetCredentialsType {
    email: string;
    password: string;
  }
  const getCredentials: GetCredentialsType = await c.req.json();
  const { email, password } = getCredentials;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
      password: password,
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
