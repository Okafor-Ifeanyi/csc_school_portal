import { Request, Response, NextFunction } from "express";
import * as services from "../services/class.service";

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const department = req.user?.department;
    const new_user = await services.CreateClass({
      ...req.body,
      department,
    });

    res.status(201).json({
      message: `Class ${req.body.name} created`,
      success: true,
      data: new_user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllClasses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract parameters from the query string
    const {
      department,
      enrollement_year,
      current_level,
      hasGraduated,
      limit,
      order,
    } = req.query;

    // Call the dynamic GetClasss function with parameters
    const classes = await services.GetClasses(
      department as string | undefined,
      enrollement_year as string | undefined,
      current_level as number | undefined,
      hasGraduated as boolean | undefined,
      limit ? Number(limit) : undefined,
      order as "asc" | "desc" | undefined,
    );

    res.status(201).json({ data: classes, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filter = { _id: req.params.id };
  try {
    const data = await services.GetClass(filter);

    res.status(201).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await services.UpdateClass(req.user?._id, req.body);

    res.status(201).json({
      data: data,
      message: "Class successfully updated",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await services.UpdateClass(req.user?._id, { is_deleted: true });

    res.status(201).json({ message: "Class has been deleted", success: true });
  } catch (error) {
    next(error);
  }
};