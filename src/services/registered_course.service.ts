import { FilterQuery, Types } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { IGrade, IREGCourse } from "../interfaces/registered_course.interface";
import REGCourse from "../models/registered_course.model";
import Session from "../models/session.model";
import Student from "../models/student.model";
import Course from "../models/course.model";

export const GetREGCourses = async (
  filter?: Partial<IREGCourse>,
  limit?: number | undefined,
  order?: "asc" | "desc" | undefined,
) => {
  const query: Partial<IREGCourse> = { ...filter, is_deleted: false };

  const REGCourseQuery = REGCourse.find(query).select("-is_deleted -__v");

  // Always sort by a specific field, for example, 'createdAt'
  if (order) {
    const sortDirection = order === "desc" ? -1 : 1;
    REGCourseQuery.sort({ createdAt: sortDirection });
  }

  if (limit) {
    REGCourseQuery.limit(Number(limit));
  }

  return await REGCourseQuery.exec();
};

export const GetREGCourse = async (filter: FilterQuery<IREGCourse>) => {
  try {
    const data = await REGCourse.findOne(
      { ...filter, is_deleted: false },
      "-__v -is_deleted",
    );

    if (!data) {
      throw new HttpException(404, "REGCourse not found");
    }

    return data;
  } catch (error: any) {
    throw new HttpException(404, "Could not find REGCourse");
  }
};

export const CreateREGCourse = async (input: IREGCourse) => {
  /**Creates REGCourse Service */
  const { session_id, course_id, student_id } = input;

  const session_data = await Session.findOne({
    _id: session_id,
    is_deleted: false,
  });

  const student_data = await Student.findOne({
    user_id: student_id,
    is_deleted: false,
  });

  const course_data = await Course.findOne({
    _id: course_id,
    is_deleted: false,
  });

  if (!session_data || !student_data || !course_data) {
    throw new HttpException(400, `This course can't be registered. Invalid ID`);
  }

  const REGCourseExists = await REGCourse.findOne(
    { student_id, course_id, session_id, is_deleted: false },
    "-__v -is_deleted",
  );

  if (REGCourseExists) {
    throw new HttpException(
      400,
      `Course ${course_data?.title} has been registered on this semester`,
    );
  }
  return await REGCourse.create({
    ...input,
    code: course_data?.code,
    unit: course_data?.unit,
  });
};

export const UpdateREGCourse = async (
  _id: Types.ObjectId,
  input: Partial<IREGCourse>,
) => {
  const data = await REGCourse.findOne({ _id, is_deleted: false });

  if (!data) {
    throw new HttpException(404, "REGCourse not found");
  }
  let total_score = 0;
  let grade: IGrade = IGrade.f;
  if (input.test_score && input.exam_score && input.lab_score) {
    total_score = input.test_score + input.lab_score + input.exam_score;

    grade =
      total_score >= 70
        ? IGrade.a
        : total_score >= 60
          ? IGrade.b
          : total_score >= 50
            ? IGrade.c
            : total_score >= 45
              ? IGrade.d
              : total_score >= 40
                ? IGrade.e
                : IGrade.f;
  }

  return await REGCourse.findByIdAndUpdate(
    _id,
    { ...input, total_score, grade },
    { new: true },
  ).select("-is_deleted -__v");
};

export const DeleteREGCourse = async (_id: Types.ObjectId) => {
  const data = await REGCourse.findOne({ _id });

  if (!data) {
    throw new HttpException(404, "REGCourse not found");
  }

  return await REGCourse.findByIdAndDelete(_id);
};
