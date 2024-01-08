import { Schema, model, Model, Document } from "mongoose";
import { IClass } from "../interfaces/class.interface";

export interface ClassDocument extends Document, IClass {}

type ClassModel = Model<ClassDocument>;

const ClassSchema = new Schema<IClass, ClassModel>(
  {
    name: {
      type: String,
      unique: true,
    },
    department: {
      type: String,
      required: [true, "department field is required"],
    },
    enrollement_year: {
      type: String,
      required: [true, "enrollement_year field is required"],
    },
    current_level: {
      type: Number,
    },
    has_graduated: {
      type: Boolean,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Class = model<IClass, ClassModel>("Class", ClassSchema);

export default Class;
