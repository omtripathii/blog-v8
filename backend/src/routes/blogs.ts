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
    prisma:any;
  };
}>();

// blogRouter.use("*", async (c, next) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set("prisma", prisma);
//   await next();
// });

// Middlewares for The Auth Route
blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header('Authorization');
  if (!jwt) {
    c.status(401)
    return c.json({error:"Unauthorized"})
  }
  const token = jwt.split(' ')[1]
  const payload = await verify(token,c.env.JWT_SECRET)
  if(!payload){
    c.status(401)
    return c.json({
      error : "Unauthorized"
    })
  }
//   @ts-ignore
  c.set('userId',payload.id)
  //@ts-ignore
  c.set('email',payload.email)
  await next();
});
// Fething all the blogs
blogRouter.get("/:id", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  return c.text(`get blog route ${id}`);
});
//Create Blog
blogRouter.post("/", (c) => {
  console.log(c.get("userId"));
  console.log(c.get("email"));
  return c.text("signin route");
});
//Modify Blog
blogRouter.put("/", (c) => {
  return c.text("Blog Modified");
});