import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import {
  getFicheOnId,
  deleteFicheOnId,
  createNewFiche,
  updateCurrentFiche,
} from "../controller/index";

let Router = express.Router();
dotenv.config();

const PARAMETERS: string = process.env.PARAMETERS as string;

// use routes
Router.route("/").post((req: Request, res: Response) => {
  createNewFiche(req, res);
});

Router.route(PARAMETERS)
  .get((req: Request, res: Response) => {
    getFicheOnId(req, res);
  })
  .put((req: Request, res: Response) => {
    updateCurrentFiche(req, res);
  })
  .delete((req: Request, res: Response) => {
    deleteFicheOnId(req, res);
  });

export default Router;
