import reportController from "@/controllers/report.controller";
import { middlewareVerifyToken } from "@/middleware/auth.middleware";
import Elysia from "elysia";

const reportRoutes = new Elysia({ prefix: "/report" });

reportRoutes.onBeforeHandle(middlewareVerifyToken);
reportRoutes.get("/", reportController.getAllReport);
reportRoutes.get("/:uuid", reportController.getOneReport);
reportRoutes.post("/", reportController.createReport);
reportRoutes.put("/:uuid", reportController.updateReport);
reportRoutes.delete("/:uuid", reportController.deleteReport);

export default reportRoutes;
