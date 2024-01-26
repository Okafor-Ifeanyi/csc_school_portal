import { FilterQuery, Types } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { ICourse } from "../interfaces/course.interface";
import Course from "../models/course.model";

export const GetCourses = async (
  filter?: Partial<ICourse>,
  limit?: number | undefined,
  order?: "asc" | "desc" | undefined,
) => {
  console.log(filter);
  const query: Partial<ICourse> = { is_deleted: false };

  const CourseQuery = Course.find(query).select("-is_deleted -__v");

  // Always sort by a specific field, for example, 'createdAt'
  if (order) {
    const sortDirection = order === "desc" ? -1 : 1;
    CourseQuery.sort({ createdAt: sortDirection });
  }

  if (limit) {
    CourseQuery.limit(Number(limit));
  }

  return await CourseQuery.exec();
};

export const GetCourse = async (filter: FilterQuery<ICourse>) => {
  try {
    const data = await Course.findOne(
      { ...filter, is_deleted: false },
      "-__v -is_deleted",
    );

    if (!data) {
      throw new HttpException(404, "Course not found");
    }

    return data;
  } catch (error: any) {
    throw new HttpException(404, "Could not find Course");
  }
};

export const CreateCourse = async (input: ICourse) => {
  /**Creates Course Service */
  const { title, session_id, class_id } = input;

  const CourseExist1 = await Course.findOne(
    { title, session_id, is_deleted: false },
    "-__v -is_deleted",
  );

  const CourseExist2 = await Course.findOne(
    { title, class_id, is_deleted: false },
    "-__v -is_deleted",
  );

  if (CourseExist1 || CourseExist2) {
    throw new HttpException(
      400,
      `Course with title ${title} was found either on this class under this session. Please Review`,
    );
  }

  return await Course.create(input);
};

export const UpdateCourse = async (
  _id: Types.ObjectId,
  input: Partial<ICourse>,
) => {
  const data = await Course.findOne({ _id, is_deleted: false });

  if (!data) {
    throw new HttpException(404, "Course not found");
  }

  return await Course.findByIdAndUpdate(_id, input, { new: true }).select(
    "-is_deleted -__v",
  );
};

export const DeleteCourse = async (_id: Types.ObjectId) => {
  const data = await Course.findOne({ _id });

  if (!data) {
    throw new HttpException(404, "Course not found");
  }

  return await Course.findByIdAndDelete(_id);
};
