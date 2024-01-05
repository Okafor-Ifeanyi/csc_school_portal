import { FilterQuery, Types } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { IAdmin } from "../interfaces/admin.interface";
import Admin from "../models/admin.model";

export const GetAdmins = async () => {
  return await Admin.find({ isDeleted: false }, "-__v -password -isDeleted");
};

export const GetAdmin = async (filter: FilterQuery<IAdmin>) => {
  try {
    return await Admin.findOne(
      { ...filter, isDeleted: false },
      "-__v -password -isDeleted",
    );
  } catch (error: unknown) {
    throw new HttpException(404, "Could not find admin");
  }
};

export const Login = async (input: Pick<IAdmin, "email" | "password">) => {
  const { email, password } = input;

  const admin = await Admin.findOne({ email, isDeleted: false });
  if (!admin)
    throw new HttpException(404, `Admin with email ${email} not found`);

  if (!admin.matchPassword(password)) {
    throw new HttpException(409, "Invalid Password");
  }
  return admin;
};

export const CreateAdmin = async (input: IAdmin) => {
  const { email } = input;

  const adminExists = await Admin.findOne({ email });

  if (adminExists && !adminExists?.isDeleted) {
    throw new HttpException(400, `Admin with email ${email} already exists`);
  }

  //   if (adminExists?.handle == handle && !adminExists?.isDeleted) {
  //     throw new HttpException(400, `Admin with handle ${handle} already exists`);
  //   }

  return await Admin.create(input);
};

export const UpdateAdmin = async (
  _id: Types.ObjectId,
  input: Partial<IAdmin>,
) => {
  const admin = await Admin.findOne({ _id });

  if (!admin) {
    throw new HttpException(404, "Admin not found");
  }

  if (!admin._id.equals(_id)) {
    throw new HttpException(403, "Unauthorized request");
  }

  //   if (input.handle) {
  //     if (await Admin.findOne({ handle: input.handle })) {
  //       throw new HttpException(400, 'Admin with handle already exists');
  //     }
  //   }

  return await Admin.findByIdAndUpdate(_id, input, { new: true }).select(
    "-isDeleted -__v -password",
  );
};
