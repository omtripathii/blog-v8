import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// // Setting Prima Client for all the routes using the middleware
// app.use("*", (c) => {
// 	const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set("prisma", prisma);
// })

// Middlewares for The Auth Route
app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set("userId", payload.id);
  await next();
});

// Signup
app.post("/api/v1/signup", async (c) => {
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
app.post("/api/v1/signin", async (c) => {
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

// Fething all the blogs

app.get("/api/v1/blog/:id", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  return c.text(`get blog route ${id}`);
});

//Create Blog

app.post("/api/v1/blog", (c) => {
  console.log(c.get("userId"));
  return c.text("signin route");
});
//Modify Blog

app.put("/api/v1/blog", (c) => {
  return c.text("Blog Modified");
});
export default app;
