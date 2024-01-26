import { ObjectId } from "mongoose";

export enum Course {
  FIRST_SEMESTER = "Harmattan Semester",
  SECOND_SEMESTER = "Rain semester",
}

export interface IREGCourse {
  session_id: ObjectId;
  course_id: ObjectId;
  student_id: ObjectId;
  code?: string;
  test_score?: number;
  lab_score?: number;
  exam_score?: number;
  total_score?: number;
  grade?: string;
  remark?: string;
  unit?: number;
  is_deleted?: boolean;
}
