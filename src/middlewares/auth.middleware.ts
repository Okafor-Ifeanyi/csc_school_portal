import { Request, Response, NextFunction } from "express";
import { HttpException } from "../httpexception/httpExceptions";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  throw new HttpException(403, "Unauthorized! Please Login");
};

export default isAuth;
