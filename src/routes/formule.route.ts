import express, { Request, Response } from "express";
import { formuleController } from "../controller/formule.controller";
let formuleRouter = express.Router();

export class FormuleRoutes extends formuleController {
  public route() {
    // use middleware
    formuleRouter
      .route("/")
      .get((req: Request, res: Response) => {
        this.getAllFormules(req, res);
      })
      .post((req: Request, res: Response) => {
        this.createNewFormule(req, res);
      });

    formuleRouter
      .route("/:id")
      .get((req: Request, res: Response) => {
        this.getFormuleOnId(req, res);
      })
      .put((req: Request, res: Response) => {
        this.updateCurrentFormule(req, res);
      })
      .delete((req: Request, res: Response) => {
        this.deleteFormuleOnId(req, res);
      });
  }
}

export default formuleRouter;
