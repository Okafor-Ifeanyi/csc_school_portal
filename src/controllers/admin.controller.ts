import { Request, Response, NextFunction } from "express";
import * as services from "../services/admin.service";
import { generateRandomAvatar } from "../utils/avatar.util";

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
  const filter =
    req.query.myprofile === "true"
      ? { _id: req.user?._id }
      : { _id: req.params.id };
  try {
    const admin = await services.GetAdmin(filter);

    admin;
    res.json({ success: true });
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
    const admin = await services.UpdateAdmin(req.user?._id, req.body);

    res.json({
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
    await services.UpdateAdmin(req.user?._id, { is_deleted: true });

    res.json({ message: "Admin has been deleted", success: true });
  } catch (error) {
    next(error);
  }
};
