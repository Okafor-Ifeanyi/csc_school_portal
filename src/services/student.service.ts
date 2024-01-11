import { FilterQuery, Types } from "mongoose";
import { HttpException } from "../httpexception/httpExceptions";
import { IStudent } from "../interfaces/student.interface";
import Student, { StudentDocument } from "../models/student.model";
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
  const new_student: StudentDocument = await Student.create(input);

  // Use $lookup to join the 'students' collection with the 'class' collection
  const studentsWithClassInfo = await Student.aggregate([
    {
      $match: { _id: new_student._id }, // Match the newly created student
    },
    {
      $lookup: {
        from: "classes", // The name of the 'class' collection
        localField: "class_id",
        foreignField: "_id",
        as: "class_info",
      },
    },
    {
      $unwind: {
        path: "$class_info",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        // Include fields from the 'students' collection
        _id: 1,
        reg_number: 1,
        full_name: 1,
        is_verified: 1,
        role: 1,
        class_id: 1,
        // Add more student fields as needed

        // Include fields from the 'class' collection
        "class_info.name": 1,
        "class_info.department": 1,
        "class_info.advisor_id": 1,
        "class_info.enrollement_year": 1,
        "class_info.current_level": 1,

        // Add more class fields as needed
      },
    },
  ]);

  return studentsWithClassInfo[0];
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
