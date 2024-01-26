import { Request, Response, NextFunction } from "express";
import * as services from "../services/registered_course.service";
import { Types } from "mongoose";

export const createREGCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const new_REGCourse = await services.CreateREGCourse({
      ...req.body,
    });

    res.status(201).json({
      message: `${new_REGCourse.code} successfully registered`,
      success: true,
      data: new_REGCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllREGCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit, order, ...filter } = req.query;

    // Call the dynamic GetREGCourses function with parameters
    const REGCourses = await services.GetREGCourses(
      filter,
      limit ? Number(limit) : undefined,
      order as "asc" | "desc" | undefined,
    );

    res
      .status(200)
      .json({ total: REGCourses.length, data: REGCourses, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleREGCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filter: { _id?: string; code?: string } = {};

  if (req.params.id.startsWith("#")) {
    // get REGCourse by code
    filter.code = req.params.id.substring(1);
  } else {
    // get REGCourse by id
    filter._id = req.params.id;
  }

  try {
    const data = await services.GetREGCourse(filter);

    res.status(200).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};

export const updateREGCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const _id: Types.ObjectId = Types.ObjectId.createFromHexString(req.params.id);
  try {
    const data = await services.UpdateREGCourse(_id, req.body);

    res.status(201).json({
      data: data,
      message: "REGCourse successfully updated",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteREGCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _id: Types.ObjectId = Types.ObjectId.createFromHexString(
      req.params.id,
    );

    await services.UpdateREGCourse(_id, { is_deleted: true });

    res
      .status(201)
      .json({ message: "REGCourse has been deleted", success: true });
  } catch (error) {
    next(error);
  }
};
