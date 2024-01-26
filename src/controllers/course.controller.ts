import { Request, Response, NextFunction } from "express";
import * as services from "../services/course.service";
import { Types } from "mongoose";


export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const new_Course = await services.CreateCourse({
      ...req.body,
    });

    res.status(201).json({
      message: `Course ${new_Course.title} created`,
      success: true,
      data: new_Course,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit, order, ...filter } = req.query;

    // Call the dynamic GetCourses function with parameters
    const Courses = await services.GetCourses(
      filter,
      limit ? Number(limit) : undefined,
      order as "asc" | "desc" | undefined,
    );

    res.status(200).json({ data: Courses, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filter: { _id?: string; title?: string; code?: string } = {};

  if (req.params.id.startsWith("@")) {
    // get course by title
    filter.code = req.params.id.substring(1);
  } else if (req.params.id.startsWith("#")) {
    // get course by code
    filter.code = req.params.id.substring(1);
  } else {
    // get course by id
    filter._id = req.params.id;
  }

  try {
    const data = await services.GetCourse(filter);

    res.status(200).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const _id: Types.ObjectId = Types.ObjectId.createFromHexString(req.params.id);
  try {
    const data = await services.UpdateCourse(_id, req.body);

    res.status(201).json({
      data: data,
      message: "Course successfully updated",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _id: Types.ObjectId = Types.ObjectId.createFromHexString(
      req.params.id,
    );

    await services.UpdateCourse(_id, { is_deleted: true });

    res.status(201).json({ message: "Course has been deleted", success: true });
  } catch (error) {
    next(error);
  }
};
