import { FilterQuery, Types } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { ISession, Semester } from "../interfaces/session.interface";
import Session from "../models/session.model";

export const GetSessions = async (
  semester?: Semester | undefined,
  year?: number | undefined,
  limit?: number | undefined,
  order?: "asc" | "desc" | undefined,
) => {
  const query: Partial<ISession> = { is_deleted: false };

  if (semester) {
    query.semester = semester;
  }

  if (year) {
    query.year = year;
  }

  const SessionQuery = Session.find(query).select("-is_deleted -__v");

  // Always sort by a specific field, for example, 'createdAt'
  if (order) {
    const sortDirection = order === "desc" ? -1 : 1;
    SessionQuery.sort({ createdAt: sortDirection });
  }

  if (limit) {
    SessionQuery.limit(Number(limit));
  }

  return await SessionQuery.exec();
};

export const GetSession = async (filter: FilterQuery<ISession>) => {
  try {
    const data = await Session.find(
      { ...filter, is_deleted: false },
      "-__v -is_deleted",
    );

    if (!data) {
      throw new HttpException(404, "Session not found");
    }

    return data;
  } catch (error: any) {
    throw new HttpException(404, "Could not find Session");
  }
};

export const CreateSession = async (input: ISession) => {
  /**Creates Session Service */
  const { name } = input;

  const SessionExists = await Session.findOne(
    { name, is_deleted: false },
    "-__v -is_deleted",
  );

  if (SessionExists) {
    throw new HttpException(
      400,
      `Session with name ${name} on this semester already exists`,
    );
  }
  const first_semester = await Session.create({
    ...input,
    semester: Semester.FIRST_SEMESTER,
  });
  const second_semester = await Session.create({
    ...input,
    semester: Semester.SECOND_SEMESTER,
  });
  return { first_semester: first_semester, second_semester: second_semester };
};

export const UpdateSession = async (
  _id: Types.ObjectId,
  input: Partial<ISession>,
) => {
  const data = await Session.findOne({ _id, is_deleted: false });

  if (!data) {
    throw new HttpException(404, "Session not found");
  }

  return await Session.findByIdAndUpdate(_id, input, { new: true }).select(
    "-is_deleted -__v",
  );
};

export const DeleteSession = async (_id: Types.ObjectId) => {
  const data = await Session.findOne({ _id });

  if (!data) {
    throw new HttpException(404, "Session not found");
  }

  return await Session.findByIdAndDelete(_id);
};
