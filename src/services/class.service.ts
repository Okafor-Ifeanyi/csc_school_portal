import { FilterQuery, Types } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { IClass } from "../interfaces/class.interface";
import Class from "../models/class.model";
import Admin, { AdminDocument } from "../models/admin.model";

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
  const classQuery = Class.find(query, "-__v -is_deleted");

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
      { ...filter, is_deleted: false },
      "-__v -password -is_deleted",
    );
  } catch (error: any) {
    throw new HttpException(404, "Could not find class");
  }
};

export const CreateClass = async (input: IClass) => {
  /**Creates Class Service */
  const { name, advisor_id } = input;

  const check_advisor: AdminDocument | null = await Admin.findById(advisor_id);
  if (check_advisor?.role !== "advisor") {
    throw new HttpException(403, "Provided Advisor ID is not an Advisor");
  }

  const classExists = await Class.findOne(
    { name },
    "-__v -password -is_deleted",
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
    "-is_deleted -__v -password",
  );
};
