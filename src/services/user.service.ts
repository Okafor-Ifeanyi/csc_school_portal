import { FilterQuery } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";

export const GetUsers = async (
  type?: string | undefined,
  limit?: number | undefined,
  order?: "asc" | "desc" | undefined,
) => {
  const query: any = { is_deleted: false };

  if (type) {
    query.type = { $in: type };
  }

  const usersQuery = User.find(query, "-__v");

  // console.log(usersQuery)
  // Always sort by a specific field, for example, 'createdAt'
  if (order) {
    const sortDirection = order === "desc" ? -1 : 1;
    usersQuery.sort({ createdAt: sortDirection });
  }

  if (limit) {
    usersQuery.limit(Number(limit));
  }
  // console.log(await usersQuery.exec())
  return await usersQuery.exec();
};

export const GetUser = async (filter: FilterQuery<IUser>) => {
  try {
    const user_data = await User.findOne({ ...filter, is_deleted: false });

    if (!user_data) {
      throw new HttpException(404, "Could not find user");
    }
    return user_data;
  } catch (error: any) {
    throw new HttpException(404, "Could not find user");
  }
};

export const CreateUser = async (input: IUser) => {
  const { username } = input;

  const userExists = await User.findOne({ username });

  if (userExists) {
    throw new HttpException(400, `User with email ${username} already exists`);
  }

  return await User.create(input);
};
