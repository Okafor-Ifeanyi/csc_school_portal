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
  const username: string = req.body.username;

  if (username.startsWith("20")) {
    passport.authenticate(
      "local",
      (err: Error, user: StudentDocument, info: IVerifyOptions) => {
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
            message: `Logged in as: ${req.user?.email}`,
            success: true,
            data: req.user,
          });
        });
      },
    )(req, res, next);
  } else {
    passport.authenticate(
      "local",
      (err: Error, user: AdminDocument, info: IVerifyOptions) => {
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
            message: `Admin Logged in as: ${req.user?.email}`,
            success: true,
            data: req.user,
          });
        });
      },
    )(req, res, next);
  }
};
