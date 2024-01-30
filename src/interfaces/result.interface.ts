import { ObjectId } from "mongoose";

export interface IResult {
  session_id: ObjectId;
  student_id: ObjectId;
  class_id: ObjectId;
  gpa: number;
  tnu?: number;
  tcp?: number;
  tqa?: number;
  is_current: boolean;
  is_deleted?: boolean;
}
