import { Schema, model, Model, Document } from "mongoose";
import { IStudent } from "../interfaces/student.interface";
import { ENUM } from "../configs/constants.config";

// export type StudentDocument = Document<IStudent> & IStudentMethods
export interface StudentDocument extends Document, IStudent {}

type StudentModel = Model<StudentDocument>;

const studentSchema = new Schema<IStudent, StudentModel>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    class_id: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    reg_number: {
      type: String,
      unique: true,
      required: [true, "Reg Number is required"],
    },
    email: {
      type: String,
    },
    full_name: {
      type: String,
      required: [true, "full_name field is required"],
    },
    phone_number: {
      type: String,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    profile_picture: {
      type: String,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ENUM.STUDENT_ROLE,
      default: ENUM.STUDENT_ROLE[2],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

studentSchema.methods.toJSON = function () {
  const userData = this.toObject();

  delete userData.password;
  delete userData.is_deleted;
  return userData;
};

const Student = model<IStudent, StudentModel>("Student", studentSchema);

export default Student;
