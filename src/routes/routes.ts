import { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import { ficheController } from "../controller/fiche.controller";
import rootMiddleware from "../middleware/root.middleware";
import ficheRouter from "./fiche.route";
import formuleRouter from "./formule.route";
dotenv.config();

export class Routes {
  private ficheController: ficheController = new ficheController();
  public route(app: Application) {
    // middleware
    app
      .use("/", rootMiddleware)
      .use("/api/fiche", ficheRouter)
      .use("/api/formule", formuleRouter);
    // root path
    app.get("/", (req: Request, res: Response) =>
      this.ficheController.getAllFiches(req, res)
    );
  }
}
