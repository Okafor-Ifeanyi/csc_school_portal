import { EmailOptions } from "joi";

// Define an enum for the possible roles
enum UserType {
  ADMIN = "admin",
  STUDENT = "student",
}

export interface IUser {
  username: EmailOptions;
  password: string;
  type?: UserType;
}

export interface IUserMethods {
  matchPassword(password: string): Promise<boolean>;
}
