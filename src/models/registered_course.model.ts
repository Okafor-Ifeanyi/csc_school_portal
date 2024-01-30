import { Schema, model, Model, Document, Types } from "mongoose";
import { IREGCourse } from "../interfaces/registered_course.interface";

export interface REGCourseDocument extends Document, IREGCourse {}

type REGCourseModel = Model<REGCourseDocument>;

const REGCourseSchema = new Schema<IREGCourse, REGCourseModel>(
  {
    course_id: {
      type: Types.ObjectId,
      ref: "Course",
      required: true,
    },
    session_id: {
      type: Types.ObjectId,
      ref: "Session",
      required: true,
    },
    student_id: {
      type: Types.ObjectId,
      ref: "Student",
      required: true,
    },
    test_score: {
      type: Number,
      default: 0,
    },
    lab_score: {
      type: Number,
      default: 0,
    },
    exam_score: {
      type: Number,
      default: 0,
    },
    total_score: {
      type: Number,
      default: 0,
    },
    remark: {
      type: String,
    },
    grade: {
      type: String,
    },
    unit: {
      type: Number,
      required: [true, "unit field is required"],
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

REGCourseSchema.index(
  { session_id: 1, course_id: 1, student_id: 1 },
  { unique: true },
);

const REGCourse = model<IREGCourse, REGCourseModel>(
  "REGCourse",
  REGCourseSchema,
);

export default REGCourse;
