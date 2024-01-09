import { FilterQuery, Types } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { IStudent } from "../interfaces/student.interface";
import Student from "../models/student.model";

export const GetStudents = async (
  department?: string | undefined,
  roles?: string[] | undefined,
  limit?: number | undefined,
  order?: "asc" | "desc" | undefined,
) => {
  const query: any = { isDeleted: false };

  if (roles && roles.length > 0) {
    query.role = { $in: roles };
  }

  if (department) {
    query.department = department;
  }

  const studentsQuery = Student.find(query, "-__v -password -isDeleted");

  // Always sort by a specific field, for example, 'createdAt'
  if (order) {
    const sortDirection = order === "desc" ? -1 : 1;
    studentsQuery.sort({ createdAt: sortDirection });
  }

  if (limit) {
    studentsQuery.limit(Number(limit));
  }

  return await studentsQuery.exec();
};

export const GetStudent = async (filter: FilterQuery<IStudent>) => {
  try {
    return await Student.findOne(
      { ...filter, isDeleted: false },
      "-__v -password -isDeleted",
    );
  } catch (error: any) {
    throw new HttpException(404, "Could not find student");
  }
};

export const Login = async (input: Pick<IStudent, "email" | "password">) => {
  const { email, password } = input;

  const student = await Student.findOne({ email, isDeleted: false });
  if (!student)
    throw new HttpException(404, `Student with email ${email} not found`);

  if (!student.matchPassword(password)) {
    throw new HttpException(409, "Invalid Password");
  }
  return student;
};

export const CreateStudent = async (input: IStudent) => {
  const { email } = input;

  const studentExists = await Student.findOne({ email });

  if (studentExists && !studentExists?.isDeleted) {
    throw new HttpException(400, `Student with email ${email} already exists`);
  }

  return await Student.create(input);
};

export const UpdateStudent = async (
  _id: Types.ObjectId,
  input: Partial<IStudent>,
) => {
  const student = await Student.findOne({ _id });

  if (!student) {
    throw new HttpException(404, "Student not found");
  }

  if (!student._id.equals(_id)) {
    throw new HttpException(403, "Unauthorized request");
  }

  return await Student.findByIdAndUpdate(_id, input, { new: true }).select(
    "-isDeleted -__v -password",
  );
};
