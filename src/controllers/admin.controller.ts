import { Request, Response, NextFunction } from "express";
import * as services from "../services/admin.service";
import { generateRandomAvatar } from "../utils/avatar.util";
import { IVerifyOptions } from "passport-local";
import "../configs/passport.config";
import passport from "passport";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile_picture = await generateRandomAvatar(req.body.email);

    const new_user = await services.CreateAdmin({
      ...req.body,
      profile_picture,
    });

    res
      .status(201)
      .json({ message: "User created", success: true, data: new_user });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "local",
    (err: Error, user: unknown, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("errors", info.message);
        return res.redirect("/login");
      }
      console.log("1. Working");
      console.log(user);
      req.logIn(user, (err) => {
        console.log("2. Working");
        if (err) {
          return next(err);
        }
        req.flash("success", "Success! You are logged in.");
        // res.redirect(req.session.returnTo || "/");
      });
    },
  )(req, res, next);
};

export const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin = await services.GetAdmins();

    res.json({ data: admin, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filter = req.params.id.startsWith("@")
    ? { handle: req.params.id }
    : { _id: req.params.id };
  try {
    const admin = await services.GetAdmin(filter);

    res.json({ data: admin, success: true });
  } catch (error) {
    next(error);
  }
};

// export const updateAdmin = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const admin = await services.UpdateAdmin(req.user?._id, req.body);

//     res.json({
//       data: admin,
//       message: 'Admin successfully updated',
//       success: true,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteAdmin = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     await services.UpdateAdmin(req.user?._id, { isDeleted: true });

//     res.json({ message: 'Admin has been deleted', success: true });
//   } catch (error) {
//     next(error);
//   }
// };
