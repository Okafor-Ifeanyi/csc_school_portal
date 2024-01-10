import bcrypt from "bcryptjs";
import { Schema, model, Model, Document } from "mongoose";
import { IAdmin, IAdminMethods } from "../interfaces/admin.interface";
import { ENUM } from "../configs/constants.config";

// export type AdminDocument = Document<IAdmin> & IAdminMethods
export interface AdminDocument extends Document, IAdmin, IAdminMethods {}

type AdminModel = Model<AdminDocument>;

const adminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "email field is required"],
    },
    password: {
      type: String,
      required: [true, "password field is required"],
    },
    first_name: {
      type: String,
      required: [true, "first_name field is required"],
    },
    last_name: {
      type: String,
      required: [true, "email field is required"],
    },
    phone_number: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
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
      enum: ENUM.ADMIN_ROLE,
      default: ENUM.ADMIN_ROLE[1],
      required: true,
    },
    department: {
      type: String,
      default: "Computer Science",
    },
  },
  {
    timestamps: true,
  },
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);

export default Admin;
