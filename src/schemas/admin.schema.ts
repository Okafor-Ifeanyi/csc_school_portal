import Joi from "joi";
import { ENUM } from "../configs/constants.config";

export const registerSchema = Joi.object().keys({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profile_picture: Joi.string().allow(""),
  is_deleted: Joi.boolean().default(false),
  role: Joi.string()
    .valid(...ENUM.ADMIN_ROLE)
    .default(ENUM.ADMIN_ROLE[0]),
  type: Joi.string()
    .valid(...ENUM.USER)
    .default(ENUM.USER[0]),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

export const updateSchema = Joi.object().keys({
  first_name: Joi.string().allow(""),
  last_name: Joi.string().allow(""),
  phone_number: Joi.string().allow(""),
  profile_picture: Joi.string().allow(""),
  role: Joi.forbidden(),
  department: Joi.forbidden(),
  email: Joi.forbidden(),
});
