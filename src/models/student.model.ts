import bcrypt from "bcryptjs";
import { Schema, model, Model, Document } from "mongoose";
import { IStudent, IStudentMethods } from "../interfaces/student.interface";
import { ENUM } from "../configs/constants.config";

// export type StudentDocument = Document<IStudent> & IStudentMethods
export interface StudentDocument extends Document, IStudent, IStudentMethods {}

type StudentModel = Model<StudentDocument>;

const studentSchema = new Schema<IStudent, StudentModel, IStudentMethods>(
  {
    class_id: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    reg_number: {
      type: Number,
      unique: true,
      required: [true, "Reg Number is required"],
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "password field is required"],
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

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

studentSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const Student = model<IStudent, StudentModel>("Student", studentSchema);

export default Student;
