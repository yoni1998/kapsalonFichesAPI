import { Response } from "express";
import { response_status_codes } from "./abstract.model";

export function successResponse(message: string, DATA: any, res: Response) {
  res.status(response_status_codes.success).json({
    STATUS: "success",
    MESSAGE: message,
    DATA,
  });
}

export function failureResponse(message: string, DATA: any, res: Response) {
  res.status(response_status_codes.bad_request).json({
    STATUS: "failed",
    MESSAGE: message,
    DATA,
  });
}

export function insufficientParameters(res: Response) {
  res.status(response_status_codes.bad_request).json({
    STATUS: "FAILURE",
    MESSAGE: "Insufficient parameters",
    DATA: {},
  });
}

export function mongoDBError(err: any, res: Response) {
  res.status(response_status_codes.internal_server_error).json({
    STATUS: "FAILURE",
    MESSAGE: "MongoDB error",
    DATA: err,
  });
}
