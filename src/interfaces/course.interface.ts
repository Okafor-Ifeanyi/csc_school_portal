import { ObjectId } from "mongoose";

export enum Course {
  FIRST_SEMESTER = "Harmattan Semester",
  SECOND_SEMESTER = "Rain semester",
}

export interface ICourse {
  session_id: ObjectId;
  class_id: ObjectId;
  title: string;
  unit: number;
  code: string;
  is_elective: boolean;
  description?: string;
  is_deleted?: boolean;
}
