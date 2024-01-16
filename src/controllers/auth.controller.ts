import { IVerifyOptions } from "passport-local";
import { HttpException } from "../httpexception/httpExceptions";
import { AdminDocument } from "../models/admin.model";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { StudentDocument } from "../models/student.model";
import "../configs/passport.config";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "local",
    (
      err: Error,
      user: StudentDocument | AdminDocument,
      info: IVerifyOptions,
    ) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        throw new HttpException(401, info.message);
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        res.status(201).json({
          message: `Logged in as an: -`,
          success: true,
          user_id: req.user?._id,
        });
      });
    },
  )(req, res, next);
};
