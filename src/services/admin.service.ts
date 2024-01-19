import { FilterQuery, Schema } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { IAdmin } from "../interfaces/admin.interface";
import Admin from "../models/admin.model";

export const GetAdmins = async (
  department?: string | undefined,
  roles?: string[] | undefined,
  limit?: number | undefined,
  order?: "asc" | "desc" | undefined,
) => {
  const query: any = { is_deleted: false };

  if (roles && roles.length > 0) {
    query.role = { $in: roles };
  }

  if (department) {
    query.department = department;
  }

  const adminsQuery = Admin.find(query, "-__v -password -is_deleted");

  // Always sort by a specific field, for example, 'createdAt'
  if (order) {
    const sortDirection = order === "desc" ? -1 : 1;
    adminsQuery.sort({ createdAt: sortDirection });
  }

  if (limit) {
    adminsQuery.limit(Number(limit));
  }
  // console.log(adminsQuery.exec())
  return await adminsQuery.exec();
};

export const GetAdmin = async (filter: FilterQuery<IAdmin>) => {
  console.log(filter);
  try {
    return await Admin.findOne(
      { ...filter, is_deleted: false },
      "-__v -password -is_deleted",
    );
  } catch (error: any) {
    throw new HttpException(404, "Could not find admin");
  }
};

export const CreateAdmin = async (input: IAdmin) => {
  const { email } = input;

  const adminExists = await Admin.findOne({ email });

  if (adminExists && !adminExists?.is_deleted) {
    throw new HttpException(400, `Admin with email ${email} already exists`);
  }

  return await Admin.create(input);
};

export const UpdateAdmin = async (
  _id: Schema.Types.ObjectId,
  input: Partial<IAdmin>,
) => {
  const admin = await Admin.findOne({ user_id: _id });

  if (!admin) {
    throw new HttpException(404, "Admin not found");
  }

  if (!(admin.user_id.toString() == _id.toString())) {
    throw new HttpException(403, "Unauthorized request here");
  }

  return await Admin.findByIdAndUpdate(admin._id, input, { new: true });
};
