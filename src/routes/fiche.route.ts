import express, { Request, Response } from "express";
import { ficheController } from "../controller/fiche.controller";
let ficheRouter = express.Router();

export class FicheRoutes extends ficheController {
  private PARAMETERS: string = process.env.PARAMETERS as string;
  public route() {
    // use routes
    ficheRouter.route("/").post((req: Request, res: Response) => {
      this.createNewFiche(req, res);
    });

    ficheRouter
      .route(this.PARAMETERS)
      .get((req: Request, res: Response) => {
        this.getFicheOnId(req, res);
      })
      .put((req: Request, res: Response) => {
        this.updateCurrentFiche(req, res);
      })
      .delete((req: Request, res: Response) => {
        this.deleteFicheOnId(req, res);
      });
  }
}

export default ficheRouter;
