import airlinesRoutes from "@/routes/airlines.route";
import authRoutes from "@/routes/auth.route";
import flightRoutes from "@/routes/flight.route";
import userRoutes from "@/routes/user.route";
import Elysia, { Context } from "elysia";

const app = new Elysia({ prefix: "/api" });

app.onAfterHandle(({ response, set }: Context) => {
  if (response && typeof response === "object" && "statusCode" in response) {
    set.status = response.statusCode as number;
    return response;
  }
});
app.use(userRoutes);
app.use(authRoutes);
app.use(airlinesRoutes);
app.use(flightRoutes);

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
