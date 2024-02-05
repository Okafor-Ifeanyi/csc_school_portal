import { ObjectId } from "mongoose";

export enum IGrade {
  a = "A",
  b = "B",
  c = "C",
  d = "D",
  e = "E",
  f = "F",
}
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
  grade?: IGrade;
  remark?: string;
  unit: number;
  is_deleted?: boolean;
}

export interface IREGCourseUpload {
  Name: string;
  "Reg. No": string;
  test_score: number;
  lab_score: number;
  exam_score: number;
}

export interface IScoreMap {
  [key: string]: {
    test_score: number;
    lab_score: number;
    exam_score: number;
  };
}
