import { EmailOptions } from "joi";
import { Types } from "mongoose";

enum StudentRole {
  course_rep = "Course Rep",
  assistant_course_rep = "Assistant Course Rep",
  regular = "Regular",
}

export interface IStudent {
  class_id: Types.ObjectId;
  reg_number: number;
  password: string;
  full_name: string;
  email?: EmailOptions;
  phone_number?: string;
  is_verified: boolean;
  profile_picture?: string;
  isDeleted: boolean;
  department: string;
  role?: StudentRole;
}

export interface IStudentMethods {
  matchPassword(password: string): Promise<boolean>;
}
