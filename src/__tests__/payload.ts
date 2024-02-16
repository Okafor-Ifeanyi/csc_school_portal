import { AdminRole, IAdmin } from "../interfaces/admin.interface";
import { IClass } from "../interfaces/class.interface";
import { IStudent } from "../interfaces/student.interface";
import { IUser } from "../interfaces/user.interface";
import { UserDocument } from "../models/user.model";

export const loginAdmin_wrong: Pick<UserDocument, "username" | "password"> = {
  username: "ella@gmail.com",
  password: "ellaaaaaa",
};

export const registerAdmin: Partial<IAdmin & IUser> = {
  email: "test234@gmail.com",
  password: "password",
  full_name: "test THe Gospel",
  role: AdminRole.HOD,
};

export const registerAdminAdvisor: Partial<IAdmin & IUser> = {
  email: "test@gmail.com",
  password: "password",
  full_name: "test THe Gospel",
  role: AdminRole.ADVISOR,
};

export const updateAdmin201: Partial<IAdmin> = {
  full_name: "Peoples Word",
};

export const id = "5f3e2cb617a4e1a6d8957c33";

export const updateAdmin422: Partial<IAdmin> = {
  full_name: "422 Error Incoming",
  role: AdminRole.ADVISOR,
};

export const registerStudent: Partial<IStudent & IUser> = {
  reg_number: "20181114645",
  full_name: "Nwogbu Emeka Anthony",
  password: "password",
};

export const createClass: Partial<IClass> = {
  name: "csc2023",
  enrollement_year: "2023",
};

export const createClass201: Partial<IClass> = {
  name: "csc2022",
  enrollement_year: "2022",
};

export const createClass422: Partial<IClass> = {
  enrollement_year: "2023",
};

export const updateClass: Partial<IClass> = {
  department: "Crop Science and Technology",
};
