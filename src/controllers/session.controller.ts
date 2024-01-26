import { Request, Response, NextFunction } from "express";
import * as services from "../services/session.service";
import { Types } from "mongoose";
import { Semester } from "../interfaces/session.interface";

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const new_session = await services.CreateSession({
      ...req.body,
    });

    res.status(201).json({
      message: `Session ${req.body.name} created`,
      success: true,
      data: new_session,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSessions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { semester, year, limit, order } = req.query;

    // Call the dynamic GetSessions function with parameters
    const Sessions = await services.GetSessions(
      semester as unknown as Semester,
      year ? Number(year) : undefined,
      limit ? Number(limit) : undefined,
      order as "asc" | "desc" | undefined,
    );

    res.status(200).json({ data: Sessions, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filter: { _id?: string; name?: string } = {};

  if (req.params.id.startsWith("@")) {
    // get REGCourse by code
    filter.name = req.params.id.substring(1);
  } else {
    // get REGCourse by id
    filter._id = req.params.id;
  }
  try {
    const data = await services.GetSession(filter);

    res.status(200).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};

export const updateSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const _id: Types.ObjectId = Types.ObjectId.createFromHexString(req.params.id);
  try {
    const data = await services.UpdateSession(_id, req.body);

    res.status(201).json({
      data: data,
      message: "Session successfully updated",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _id: Types.ObjectId = Types.ObjectId.createFromHexString(
      req.params.id,
    );

    await services.UpdateSession(_id, { is_deleted: true });

    res
      .status(201)
      .json({ message: "Session has been deleted", success: true });
  } catch (error) {
    next(error);
  }
};
