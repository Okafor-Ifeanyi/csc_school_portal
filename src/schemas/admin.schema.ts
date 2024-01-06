import Joi from "joi";

enum AdminRole {
  HOD = "hod",
  ADVISOR = "advisor",
  LAB_ATTENDANT = "lab_attendant",
  LECTURER = "lecturer",
}

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone_number: Joi.string(),
  status: Joi.boolean().default(true),
  profile_picture: Joi.string().allow(""),
  isDeleted: Joi.boolean().default(false),
  role: Joi.string()
    .valid(...Object.values(AdminRole))
    .default(AdminRole.HOD),
  department: Joi.string().default("Computer Science"),
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
});
