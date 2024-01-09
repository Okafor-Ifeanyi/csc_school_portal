import { EmailOptions } from "joi";

// Define an enum for the possible roles
enum AdminRole {
  HOD = "hod",
  ADVISOR = "advisor",
  LAB_ATTENDANT = "lab_attendant",
  LECTURER = "lecturer",
}

export interface IAdmin {
  email: EmailOptions;
  password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  status: boolean;
  profile_picture?: string;
  isDeleted: boolean;
  department?: string;
  role?: AdminRole;
}

export interface IAdminMethods {
  matchPassword(password: string): Promise<boolean>;
}
