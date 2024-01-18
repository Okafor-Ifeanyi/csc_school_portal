import { Request, Response, NextFunction } from "express";
import { HttpException } from "../httpexception/httpExceptions";
import Admin from "../models/admin.model";
import { ENUM } from "../configs/constants.config";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  throw new HttpException(403, "Unauthorized! Please Login");
};

export const isHOD = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin = await Admin.findOne({
      user_id: req.user?._id,
      role: ENUM.ADMIN_ROLE[0],
    });

    if (!admin) {
      throw new HttpException(403, "Unauthorized! Please Login as HOD");
    }
    return next();
  } catch (error) {
    next(error);
  }
};
