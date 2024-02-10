import { AdminRole, IAdmin } from "../interfaces/admin.interface";
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
  role: AdminRole.HOD,
};

export const registerStudent: Partial<IStudent & IUser> = {
  class_id: "65a9630ce5792818ed3f9e96",
  reg_number: "20181114645",
  full_name: "Nwogbu Emeka Anthony",
  password: "password",
};
