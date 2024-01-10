import { FilterQuery, Types } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { IStudent } from "../interfaces/student.interface";
import Student from "../models/student.model";
import Class, { ClassDocument } from "../models/class.model";

export const GetStudents = async (
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

  const studentsQuery = Student.find(query, "-__v -password -is_deleted");

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
      { ...filter, is_deleted: false },
      "-__v -password -is_deleted",
    );
  } catch (error: any) {
    throw new HttpException(404, "Could not find student");
  }
};

export const Login = async (input: Pick<IStudent, "email" | "password">) => {
  const { email, password } = input;

  const student = await Student.findOne({ email, is_deleted: false });
  if (!student)
    throw new HttpException(404, `Student with email ${email} not found`);

  if (!student.matchPassword(password)) {
    throw new HttpException(409, "Invalid Password");
  }
  return student;
};

export const CreateStudent = async (input: IStudent) => {
  const { class_id, reg_number } = input;

  const classExists: ClassDocument | null = await Class.findOne({
    _id: class_id,
    is_deleted: false,
  });
  if (!classExists) {
    throw new HttpException(422, "Class does not exist.");
  }

  const studentExists = await Student.findOne({ reg_number });
  if (studentExists && !studentExists?.is_deleted) {
    throw new HttpException(
      400,
      `Student with reg number ${reg_number} already exists`,
    );
  }

  return await Student.create(input);
};

export const UpdateStudent = async (
  _id: Types.ObjectId | undefined,
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
    "-is_deleted -__v -password",
  );
};
