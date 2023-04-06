import { Request, Response } from "express";
import {
  successResponse,
  failureResponse,
  mongoDBError,
  insufficientParameters,
} from "../common/abstract.response";
import Joi from "joi";
import { IFiche } from "../interface/fiche.interface";
import {
  findAllFiches,
  ficheOnId,
  createFiche,
  updateFiche,
  deleteFiche,
} from "../service";

export const getAllFiches = (req: Request, res: Response) => {
  try {
    findAllFiches(req.query?.sort).then((data: any) => {
      data
        ? successResponse("get all fiches successfully", data, res)
        : failureResponse("something went wrong", [], res);
    });
  } catch (err: any) {
    mongoDBError(err, res);
  }
};

export const getFicheOnId = (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const ficheId = { _id: req.params.id };
      ficheOnId(ficheId).then((data: any) => {
        data
          ? successResponse("get fiche on id successfully", data, res)
          : failureResponse("something went wrong", data, res);
      });
    } else {
      insufficientParameters(res);
    }
  } catch (error) {
    mongoDBError(error, res);
  }
};

export const createNewFiche = (req: Request, res: Response) => {
  // input validation
  const schema = Joi.object().keys({
    naam: Joi.string().required(),
    adres: Joi.string(),
    telefoonNummer: Joi.number(),
    mobielNummer: Joi.number(),
    zakelijkNummer: Joi.number(),
    created_on: Joi.date(),
  });
  if (schema.validate(req.body).error) {
    failureResponse(
      "something went wrong",
      schema.validate(req.body).error?.message,
      res
    );
  } else {
    // this check whether all the fields were send through the request or not
    const newFiche: IFiche = {
      naam: req.body.naam,
      adres: req.body.adres,
      telefoonNummer: req.body.telefoonNummer,
      mobielNummer: req.body.mobielNummer,
      zakelijkNummer: req.body.zakelijkNummer,
      is_deleted: req.body.isDeleted,
      created_on: {
        created_on: new Date(Date.now()),
        info: "New fiche created",
      },
    };
    // send request
    createFiche(newFiche).then(() => {
      successResponse("create fiche successfully", newFiche, res);
    });
  }
};

export const updateCurrentFiche = (req: Request, res: Response) => {
  if (req.params.id) {
    const ficheId = { _id: req.params.id };
    ficheOnId(ficheId).then((data: any) => {
      // input validation
      const schema = Joi.object().keys({
        naam: Joi.string().required(),
        adres: Joi.string(),
        telefoonNummer: Joi.number(),
        mobielNummer: Joi.number(),
        zakelijkNummer: Joi.number(),
        created_on: Joi.date(),
      });

      if (schema.validate(req.body).error) {
        failureResponse(
          "something went wrong",
          schema.validate(req.body).error?.message,
          res
        );
      } else {
        const editFiche: IFiche = {
          _id: req.params.id,
          naam: req.body.naam ? req.body.naam : data.naam,
          adres: req.body.adres ? req.body.adres : data.adres,
          telefoonNummer: req.body.telefoonNummer
            ? req.body.telefoonNummer
            : data.telefoonNummer,
          mobielNummer: req.body.mobielNummer
            ? req.body.mobielNummer
            : data.mobielNummer,
          zakelijkNummer: req.body.zakelijkNummer
            ? req.body.zakelijkNummer
            : data.zakelijkNummer,
          is_deleted: req.body.is_deleted
            ? req.body.is_deleted
            : data.is_deleted,
          created_on: data.modification_notes,
        };
        updateFiche(editFiche).then((data: any) => {
          successResponse("update fiche successfully", data, res);
        });
      }
    });
  } else {
    insufficientParameters(res);
  }
};

export const deleteFicheOnId = (req: Request, res: Response) => {
  if (req.params.id) {
    deleteFiche(req.params.id).then(() => {
      successResponse(
        "delete fiche successfully with id " + req.params.id,
        null,
        res
      );
    });
  } else {
    insufficientParameters(res);
  }
};
