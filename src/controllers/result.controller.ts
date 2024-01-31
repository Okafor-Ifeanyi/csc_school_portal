import { Request, Response, NextFunction } from "express";
import * as services from "../services/result.service";
import { GetStudents } from "../services/student.service";
import { GetClass } from "../services/class.service";

export const createResult = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const new_Result = await services.generateResult({
      ...req.body,
    });

    res.status(201).json({
      message: `Result successfully registered`,
      success: true,
      data: new_Result,
    });
  } catch (error) {
    next(error);
  }
};

export const generateClassResult = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { class_id, session_id } = req.body;

    const filter = { class_id: class_id };
    const check_class = await GetClass(filter); // Check if class exists
    const student_list = await GetStudents(filter);

    const class_result = [];
    for (const student of student_list) {
      const data = { student_id: student.user_id, session_id: session_id };
      const new_Result = await services.generateResult(data);

      class_result.push(new_Result);
    }

    res.status(201).json({
      message: `Class of ${check_class.name}, ${check_class.department} Department Result Generated Successfully`,
      success: true,
      data: class_result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllResults = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit, order, ...filter } = req.query;

    // Call the dynamic GetResults function with parameters
    const Results = await services.GetResults(
      filter,
      limit ? Number(limit) : undefined,
      order as "asc" | "desc" | undefined,
    );

    res
      .status(200)
      .json({ total: Results.length, data: Results, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleResult = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filter = { _id: req.params.id };

  try {
    const data = await services.GetResult(filter);

    res.status(200).json({ success: true, message: data });
  } catch (error) {
    next(error);
  }
};
