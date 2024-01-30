import { FilterQuery } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { GetREGCourses } from "./registered_course.service";
import { IResult } from "../interfaces/result.interface";
import Session from "../models/session.model";
import Student from "../models/student.model";
import Result from "../models/result.model";

export const generateResult = async (data: Partial<IResult>) => {
  const { student_id, session_id } = data;

  await Session.findOne({
    _id: session_id,
    is_deleted: false,
  });

  const student_data = await Student.findOne({
    user_id: student_id,
    is_deleted: false,
  });

  const filter = { student_id: student_id, session_id: session_id };
  const courses = await GetREGCourses(filter);

  let total_score: number = 0;
  let total_unit: number = 0;
  for (const course of courses) {
    enum grade_rank {
      "A" = 5,
      "B" = 4,
      "C" = 3,
      "D" = 2,
      "E" = 1,
      "F" = 0,
    }
    const grade = course.grade as keyof typeof grade_rank;
    const grade_value = grade_rank[grade];
    total_score += course.unit * grade_value;
    total_unit += course.unit;
  }

  const gpa = total_score / total_unit;

  const new_result = await Result.create({
    ...data,
    gpa: gpa,
    class_id: student_data?.class_id,
  });

  const old_result = await Result.findOne({
    student_id: student_id,
    session_id: session_id,
  })
    .sort({ createdAt: -1 })
    .exec();

  if (old_result) {
    old_result.is_current = false;
    await old_result.save();
  }

  return new_result;
};

export const GetResults = async (
  filter?: Partial<IResult>,
  limit?: number | undefined,
  order?: "asc" | "desc" | undefined,
) => {
  console.log(filter);
  const query: Partial<IResult> = { is_deleted: false };

  const ResultQuery = Result.find(query).select("-is_deleted -__v");

  // Always sort by a specific field, for example, 'createdAt'
  if (order) {
    const sortDirection = order === "desc" ? -1 : 1;
    ResultQuery.sort({ createdAt: sortDirection });
  }

  if (limit) {
    ResultQuery.limit(Number(limit));
  }

  return await ResultQuery.exec();
};

export const GetResult = async (filter: FilterQuery<IResult>) => {
  try {
    const data = await Result.findOne(
      { ...filter, is_deleted: false },
      "-__v -is_deleted",
    );

    if (!data) {
      throw new HttpException(404, "Result not found");
    }

    return data;
  } catch (error: any) {
    throw new HttpException(404, "Could not find Result");
  }
};
