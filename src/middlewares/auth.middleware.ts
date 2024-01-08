import { Request, Response, NextFunction } from "express";
import { HttpException } from "../httpexception/httpExceptions";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  throw new HttpException(403, "Unauthorized! Please Login");
};

export const isHOD = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role === "hod") {
    return next();
  }
  throw new HttpException(403, "Unauthorized! Please Login as HOD");
};
