import bcrypt from "bcryptjs";
import { Schema, model, Model, Document } from "mongoose";
import { IUser, IUserMethods } from "../interfaces/user.interface";
import { ENUM } from "../configs/constants.config";

// export type UserDocument = Document<IUser> & IUserMethods
export interface UserDocument extends Document, IUser, IUserMethods {}

type UserModel = Model<UserDocument>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "email / reg number field is required"],
    },
    password: {
      type: String,
      required: [true, "password field is required"],
    },
    type: {
      type: String,
      enum: ENUM.USER,
      default: ENUM.USER[1],
      required: true,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const userData = this.toObject();

  delete userData.password;
  delete userData.is_deleted;
  return userData;
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
