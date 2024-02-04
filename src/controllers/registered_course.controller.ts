import { Request, Response, NextFunction } from "express";
import * as services from "../services/registered_course.service";
import { Types } from "mongoose";
import { GetClass } from "../services/class.service";
import { GetStudents } from "../services/student.service";
import { excelToJson } from "../utils/excel.util";
import {
  IREGCourseUpload,
  IScoreMap,
} from "../interfaces/registered_course.interface";
import { REGCourseDocument } from "../models/registered_course.model";

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

export const uploadStudentScores = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const _id: Types.ObjectId = Types.ObjectId.createFromHexString(req.params.id);
  try {
    const { session_id, course_id, student_id } = req.body;
    const registered_course = await services.GetREGCourse({
      session_id,
      course_id,
      student_id,
    });

    const data = await services.UpdateREGCourse(
      registered_course._id,
      req.body,
    );

    res.status(201).json({
      data: data,
      message: "REGCourse successfully updated",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadClassScores = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { session_id, course_id, class_id } = req.body;

    const filter = { class_id: class_id };
    const check_class = await GetClass(filter); // Check if class exists
    const student_list = await GetStudents(filter);

    const scores: IREGCourseUpload[] = excelToJson(req.files?.class_list.path);

    const updated_course: REGCourseDocument[] = [];

    // Create a mapping of reg_number to score for efficient lookup
    const scoreMap: IScoreMap = {};

    scores.forEach((score) => {
      const regNumber = score["Reg. No"];
      scoreMap[regNumber] = {
        test_score: score.test_score,
        lab_score: score.lab_score,
        exam_score: score.exam_score,
      };
    });

    // Batch updates
    const updatePromises = student_list.map(async (student) => {
      const data = { student_id: student.user_id, session_id, course_id };
      const registered_course = await services.GetREGCourse(data);

      const studentRegNumber = student.reg_number;
      if (scoreMap.hasOwnProperty(studentRegNumber)) {
        const updated = await services.UpdateREGCourse(registered_course._id, {
          ...scoreMap[studentRegNumber],
        });

        // Check if 'updated' is not null before pushing
        if (updated !== null) {
          updated_course.push(updated);
        }
      }
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    res.status(201).json({
      data: updated_course,
      message: `Successfully updated score for class ${check_class.name}`,
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
