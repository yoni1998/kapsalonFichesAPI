import { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import rootMiddleware from "../middleware/root.middleware";
import ficheRouter from "./fiche.route";
import formuleRouter from "./formule.route";
import { getAllFiches } from "../controller/index";
dotenv.config();

export class Routes {
  private ROOTPATH: string = process.env.ROOTPATH as string;
  private SUBPATH: string = process.env.SUBPATH as string;
  public route(app: Application) {
    // middleware
    app
      .use("/", rootMiddleware)
      .use(this.ROOTPATH, ficheRouter)
      .use(this.SUBPATH, formuleRouter);
    // root path
    app.get("/", (req: Request, res: Response) => getAllFiches(req, res));
  }
}
