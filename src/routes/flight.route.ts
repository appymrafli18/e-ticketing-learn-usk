import flightController from "@/controllers/flight.controller";
import { middlewareVerifyToken } from "@/middleware/auth.middleware";
import Elysia from "elysia";

const flightRoutes = new Elysia({ prefix: "/flights" });

flightRoutes.onBeforeHandle(middlewareVerifyToken);
flightRoutes.get("/all", flightController.getAllFlight);
flightRoutes.post("/create", flightController.createFlight);
flightRoutes.get("/select/:uuid", flightController.getFlightById);
flightRoutes.put("/update/:uuid", flightController.updateFlight);
flightRoutes.delete("/delete/:uuid", flightController.deleteFlight);

export default flightRoutes;
