import { Schema, model, Model, Document, Types } from "mongoose";
import { IResult } from "../interfaces/result.interface";

export interface ResultDocument extends Document, IResult {}

type ResultModel = Model<ResultDocument>;

const ResultSchema = new Schema<IResult, ResultModel>(
  {
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
    gpa: {
      type: Number,
      default: 0,
    },
    tnu: {
      type: Number,
      default: 0,
    },
    isCurrent: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

ResultSchema.index(
  { session_id: 1, course_id: 1, student_id: 1 },
  { unique: true },
);

const Result = model<IResult, ResultModel>("Result", ResultSchema);

export default Result;
