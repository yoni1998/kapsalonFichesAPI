import { Request, Response } from "express";
import {
  successResponse,
  failureResponse,
  mongoDBError,
  insufficientParameters,
} from "../common/abstract.response";
import formuleService from "../service/formule.service";
import Joi from "joi";
import { IFormule } from "../interface/formule.interface";

export class formuleController extends formuleService {
  public getAllFormules(req: Request, res: Response) {
    try {
      this.findAll().then((data: any) => {
        data
          ? successResponse("get all formules successfully", data, res)
          : failureResponse("something went wrong", [], res);
      });
    } catch (err: any) {
      mongoDBError(err, res);
    }
  }

  protected getFormuleOnId(req: Request, res: Response) {
    try {
      if (req.params.id) {
        const formuleId = { _id: req.params.id };
        this.formuleOnId(formuleId).then((data) => {
          data
            ? successResponse("get formule on id successfully", data, res)
            : failureResponse("something went wrong", data, res);
        });
      } else {
        insufficientParameters(res);
      }
    } catch (error) {
      mongoDBError(error, res);
    }
  }

  protected createNewFormule(req: Request, res: Response) {
    // input validation
    const schema = Joi.object().keys({
      formule: Joi.string().required(),
      opmerking: Joi.string(),
      prijs: Joi.number(),
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
      const newFormule: IFormule = {
        formule: req.body.formule,
        opmerking: req.body.opmerking,
        prijs: req.body.prijs,
        is_deleted: req.body.isDeleted,
        created_on: {
          created_on: new Date(Date.now()),
          info: "New formule created",
        },
      };
      // send request
      this.createFormule(newFormule).then(() => {
        successResponse("create formule successfully", newFormule, res);
      });
    }
  }

  protected updateCurrentFormule(req: Request, res: Response) {
    if (req.params.id) {
      const formuleId = { _id: req.params.id };
      this.formuleOnId(formuleId).then((data: any) => {
        // input validation
        const schema = Joi.object().keys({
          formule: Joi.string().required(),
          opmerking: Joi.string(),
          prijs: Joi.number(),
          created_on: Joi.date(),
        });

        if (schema.validate(req.body).error) {
          failureResponse(
            "something went wrong",
            schema.validate(req.body).error?.message,
            res
          );
        } else {
          const editFormule: IFormule = {
            _id: req.params.id,
            formule: req.body.formule ? req.body.formule : data.formule,
            opmerking: req.body.opmerking ? req.body.opmerking : data.opmerking,
            prijs: req.body.prijs ? req.body.prijs : data.prijs,
            is_deleted: req.body.is_deleted
              ? req.body.is_deleted
              : data.is_deleted,
            created_on: data.modification_notes,
          };
          this.updateFormule(editFormule).then((data: any) => {
            successResponse("update formule successfully", data, res);
          });
        }
      });
    } else {
      insufficientParameters(res);
    }
  }

  protected deleteFormuleOnId(req: Request, res: Response) {
    if (req.params.id) {
      this.deleteFormule(req.params.id).then(() => {
        successResponse(
          "delete formule successfully with id " + req.params.id,
          null,
          res
        );
      });
    } else {
      insufficientParameters(res);
    }
  }
}
