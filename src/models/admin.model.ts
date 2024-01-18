import { Schema, model, Model, Document, Types } from "mongoose";
import { IAdmin } from "../interfaces/admin.interface";
import { ENUM } from "../configs/constants.config";

// export type AdminDocument = Document<IAdmin> & IAdminMethods
export interface AdminDocument extends Document, IAdmin {}

type AdminModel = Model<AdminDocument>;

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email field is required"],
    },
    full_name: {
      type: String,
      required: [true, "full field is required"],
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

adminSchema.methods.toJSON = function () {
  const userData = this.toObject();

  delete userData.is_deleted;
  return userData;
};

const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);

export default Admin;
