import { Request, Response, NextFunction } from "express";
import * as services from "../services/admin.service";
import * as userServices from "../services/user.service";
import { generateRandomAvatar } from "../utils/avatar.util";
import { UserDocument } from "../models/user.model";
import { UserType } from "../interfaces/user.interface";
import { ObjectId } from "mongoose";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile_picture = await generateRandomAvatar(req.body.email);

    const user: UserDocument = await userServices.CreateUser({
      username: req.body.email,
      password: req.body.password,
      type: UserType.ADMIN,
    });
    const new_user = await services.CreateAdmin({
      ...req.body,
      user_id: user._id,
      profile_picture,
    });

    res
      .status(201)
      .json({ message: "User created", success: true, data: new_user });
  } catch (error) {
    next(error);
  }
};

export const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract parameters from the query string
    const { department, roles, limit, order } = req.query;

    // Call the dynamic GetAdmins function with parameters
    const admins = await services.GetAdmins(
      department as string | undefined,
      roles as string[] | undefined,
      limit ? Number(limit) : undefined,
      order as "asc" | "desc" | undefined,
    );

    res.json({ data: admins, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin = await services.GetAdmin({ user_id: req.params.id });

    res.status(201).json({ success: true, data: admin });
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id as unknown as ObjectId;
    const admin = await services.UpdateAdmin(userId, req.body);

    res.status(201).json({
      data: admin,
      message: "Admin successfully updated",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id as unknown as ObjectId;
    await services.UpdateAdmin(userId, req.body);

    res.status(201).json({ message: "Admin has been deleted", success: true });
  } catch (error) {
    next(error);
  }
};
