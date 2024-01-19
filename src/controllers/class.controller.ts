import { Request, Response, NextFunction } from "express";
import * as services from "../services/class.service";
import { Types } from "mongoose";

export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.body);
    // const department = req.user?.department;
    const new_user = await services.CreateClass({
      ...req.body,
    });

    res.status(201).json({
      message: `Class ${new_user.name} created`,
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

    res.status(200).json({ data: classes, success: true });
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

    res.status(200).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const _id: Types.ObjectId = Types.ObjectId.createFromHexString(req.params.id);
  try {
    const data = await services.UpdateClass(_id, req.body);

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
    const _id: Types.ObjectId = Types.ObjectId.createFromHexString(
      req.params.id,
    );

    await services.UpdateClass(_id, { is_deleted: true });

    res.status(201).json({ message: "Class has been deleted", success: true });
  } catch (error) {
    next(error);
  }
};
