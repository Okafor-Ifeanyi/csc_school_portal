import { EmailOptions } from "joi";
import Types from "mongoose";

// Define an enum for the possible roles
export enum AdminRole {
  HOD = "hod",
  ADVISOR = "advisor",
  LAB_ATTENDANT = "lab_attendant",
  LECTURER = "lecturer",
}

export interface IAdmin {
  user_id: Types.ObjectId;
  email: EmailOptions;
  full_name: string;
  phone_number?: string;
  status: boolean;
  profile_picture?: string;
  is_deleted: boolean;
  department?: string;
  role?: AdminRole;
}

export interface IAdminMethods {
  matchPassword(password: string): Promise<boolean>;
}
