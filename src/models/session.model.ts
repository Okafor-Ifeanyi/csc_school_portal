import { Schema, model, Model, Document } from "mongoose";
import { ISession, Semester } from "../interfaces/session.interface";

export interface SessionDocument extends Document, ISession {}

type SessionModel = Model<SessionDocument>;

const SessionSchema = new Schema<ISession, SessionModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    year: {
      type: Number,
    },
    is_current_session: {
      type: Boolean,
      required: [true, "department field is required"],
      default: true,
    },
    semester: {
      type: String,
      enum: Semester,
      required: true,
      default: Semester.FIRST_SEMESTER,
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

// Create a compound index for name and semester
SessionSchema.index({ name: 1, semester: 1 }, { unique: true });

const Session = model<ISession, SessionModel>("Session", SessionSchema);

export default Session;
