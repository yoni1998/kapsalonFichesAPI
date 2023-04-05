import { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import { ficheController } from "../controller/fiche.controller";
import rootMiddleware from "../middleware/root.middleware";
import router from "./fiche.route";
dotenv.config();

export class Routes {
  private ficheController: ficheController = new ficheController();
  public route(app: Application) {
    // middleware
    app.use("/", rootMiddleware).use("/api", router);
    // root path
    app.get("/", (req: Request, res: Response) =>
      this.ficheController.getAllFiches(req, res)
    );
  }
}
