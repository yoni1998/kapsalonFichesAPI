import { NextFunction } from "express";

// Middleware function
const rootMiddleware: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware is called");
  next();
};

export default rootMiddleware;
