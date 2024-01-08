import { FilterQuery, Types } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { IClass } from "../interfaces/class.interface";
import Class from "../models/class.model";

export const GetClasses = async (
  department?: string | undefined,
  enrollement_year?: string | undefined,
  current_level?: number | undefined,
  hasGraduated?: boolean | undefined,
  limit?: number | undefined,
  order?: "asc" | "desc" | undefined,
) => {
  const query: Partial<IClass> = { is_deleted: false };

  if (enrollement_year) {
    query.enrollement_year = enrollement_year;
  }

  if (department) {
    query.department = department;
  }

  if (current_level) {
    query.current_level = current_level;
  }

  if (hasGraduated != undefined) {
    query.has_graduated = hasGraduated;
  }
  const classQuery = Class.find(query, "-__v -password -isDeleted");

  // Always sort by a specific field, for example, 'createdAt'
  if (order) {
    const sortDirection = order === "desc" ? -1 : 1;
    classQuery.sort({ createdAt: sortDirection });
  }

  if (limit) {
    classQuery.limit(Number(limit));
  }

  return await classQuery.exec();
};

export const GetClass = async (filter: FilterQuery<IClass>) => {
  try {
    return await Class.findOne(
      { ...filter, isDeleted: false },
      "-__v -password -isDeleted",
    );
  } catch (error: any) {
    throw new HttpException(404, "Could not find class");
  }
};

export const CreateClass = async (input: IClass) => {
  const { name } = input;

  const classExists = await Class.findOne(
    { name },
    "-__v -password -isDeleted",
  );

  if (classExists && !classExists?.is_deleted) {
    throw new HttpException(400, `Class with name ${name} already exists`);
  }

  return await Class.create(input);
};

export const UpdateClass = async (
  _id: Types.ObjectId,
  input: Partial<IClass>,
) => {
  const data = await Class.findOne({ _id });

  if (!data) {
    throw new HttpException(404, "Class not found");
  }

  if (!data._id.equals(_id)) {
    throw new HttpException(403, "Unauthorized request");
  }

  return await Class.findByIdAndUpdate(_id, input, { new: true }).select(
    "-isDeleted -__v -password",
  );
};
