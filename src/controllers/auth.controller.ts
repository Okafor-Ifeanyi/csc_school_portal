import { IVerifyOptions } from "passport-local";
import { HttpException } from "../httpexception/httpExceptions";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import "../configs/passport.config";
import { UserDocument } from "../models/user.model";

/**
 * Log in.
 * @route post /auth/login
 */
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

/**
 * Log out.
 * @route GET /logout
 */
export const logout = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Log the user out without providing any additional options
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.status(201).json({
      message: `Logged out`,
      success: true,
    });
  });
};
