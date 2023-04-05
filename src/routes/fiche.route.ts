import express, { Request, Response } from "express";
import { ficheController } from "../controller/fiche.controller";
import rootMiddleware from "../middleware/root.middleware";
let router = express.Router();

export class FicheRoutes extends ficheController {
  public route() {
    // use middleware
    router.route("/fiche").post((req: Request, res: Response) => {
      this.createNewFiche(req, res);
    });

    router
      .route("/fiche/:id")
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

export default router;
