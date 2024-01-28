import { ObjectId } from "mongoose";

export interface IResult {
  session_id: ObjectId;
  student_id: ObjectId;
  gpa: number;
  tnu: number;
  isCurrent: boolean;
}
