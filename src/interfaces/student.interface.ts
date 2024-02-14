import { EmailOptions } from "joi";
import { ObjectId } from "mongoose";

enum StudentRole {
  course_rep = "Course Rep",
  assistant_course_rep = "Assistant Course Rep",
  regular = "Regular",
}

export interface IStudent {
  user_id: ObjectId;
  class_id?: ObjectId;
  reg_number: string;
  full_name: string;
  email?: EmailOptions;
  phone_number?: string;
  is_verified: boolean;
  profile_picture?: string;
  is_deleted: boolean;
  role?: StudentRole;
}

export interface IStudentMethods {
  matchPassword(password: string): Promise<boolean>;
}

export interface IStudentUpload {
  last_name: string;
  first_name: string;
  registration_number: string;
  email: string;
}
