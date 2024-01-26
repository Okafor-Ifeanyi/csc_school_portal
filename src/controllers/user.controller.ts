import { Request, Response, NextFunction } from "express";
import * as services from "../services/user.service";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract parameters from the query string
    const { type, limit, order } = req.query;

    // Call the dynamic GetUsers function with parameters
    const Users = await services.GetUsers(
      type as string | undefined,
      limit ? Number(limit) : undefined,
      order as "asc" | "desc" | undefined,
    );

    res.json({ data: Users, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filter: { _id?: string; username?: string } = {};

  if (req.params.id.startsWith("@")) {
    // get REGCourse by code
    filter.username = req.params.id.substring(1);
  } else {
    // get REGCourse by id
    filter._id = req.params.id;
  }
  try {
    const User = await services.GetUser(filter);

    res.json({ success: true, data: User });
  } catch (error) {
    next(error);
  }
};
