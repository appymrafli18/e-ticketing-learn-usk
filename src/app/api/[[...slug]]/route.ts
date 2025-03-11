import authRoutes from "@/routes/auth.route";
import userRoutes from "@/routes/user.route";
import Elysia, { Context } from "elysia";
import { cookie } from "@elysiajs/cookie";

const app = new Elysia({ prefix: "/api" }).use(cookie());

app.onAfterHandle(({ response, set }: Context) => {
  if (response && typeof response === "object" && "statusCode" in response) {
    set.status = response.statusCode as number;
    return response;
  }
});
app.use(userRoutes);
app.use(authRoutes);

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
