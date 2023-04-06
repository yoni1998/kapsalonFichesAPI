import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import {
  createNewFormule,
  deleteFormuleOnId,
  getAllFormules,
  getFormuleOnId,
  updateCurrentFormule,
} from "../controller/index";

let Router = express.Router();
dotenv.config();
const PARAMETERS: string = process.env.PARAMETERS as string;

// routes
Router.route("/")
  .get((req: Request, res: Response) => {
    getAllFormules(req, res);
  })
  .post((req: Request, res: Response) => {
    createNewFormule(req, res);
  });

Router.route(PARAMETERS)
  .get((req: Request, res: Response) => {
    getFormuleOnId(req, res);
  })
  .put((req: Request, res: Response) => {
    updateCurrentFormule(req, res);
  })
  .delete((req: Request, res: Response) => {
    deleteFormuleOnId(req, res);
  });

export default Router;
