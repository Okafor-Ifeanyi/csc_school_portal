import { Schema, model, Model, Document, Types } from "mongoose";
import { ICourse } from "../interfaces/course.interface";

export interface CourseDocument extends Document, ICourse {}

type CourseModel = Model<CourseDocument>;

const CourseSchema = new Schema<ICourse, CourseModel>(
  {
    class_id: {
      type: Types.ObjectId,
      ref: "Class",
      required: true,
    },
    session_id: {
      type: Types.ObjectId,
      ref: "Class",
      required: true,
    },
    is_elective: {
      type: Boolean,
      required: [true, "is_elective field is required"],
      default: false,
    },
    title: {
      type: String,
      required: [true, "title field is required"],
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: Number,
      required: [true, "unit field is required"],
    },
    description: {
      type: String,
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

CourseSchema.index({ session_id: 1, title: 1 }, { unique: true });
CourseSchema.index({ session_id: 1, code: 1 }, { unique: true });

const Course = model<ICourse, CourseModel>("Course", CourseSchema);

export default Course;
