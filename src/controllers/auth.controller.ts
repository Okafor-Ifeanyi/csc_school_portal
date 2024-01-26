import { IVerifyOptions } from "passport-local";
import { HttpException } from "../httpexception/httpExceptions";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import "../configs/passport.config";
import { UserDocument } from "../models/user.model";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "local",
    (err: Error, user: UserDocument, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        throw new HttpException(401, info.message);
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }

        res.status(201).json({
          message: `Logged in as : ${user.type}`,
          success: true,
          user: req.user,
        });
      });
    },
  )(req, res, next);
};
