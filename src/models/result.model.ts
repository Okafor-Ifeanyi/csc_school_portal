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
    class_id: {
      type: Types.ObjectId,
      ref: "Class",
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
    tcp: {
      type: Number,
      default: 0,
    },
    tqa: {
      type: Number,
      default: 0,
    },
    is_current: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Result = model<IResult, ResultModel>("Result", ResultSchema);

export default Result;
