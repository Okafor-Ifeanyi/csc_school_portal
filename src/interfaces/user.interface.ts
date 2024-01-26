// Define an enum for the possible roles
export enum UserType {
  ADMIN = "admin",
  STUDENT = "student",
}

export interface IUser {
  username: string;
  password: string;
  type?: UserType;
  is_deleted?: boolean;
}

export interface IUserMethods {
  matchPassword(password: string): Promise<boolean>;
}
