import Joi from "joi";

enum AdminRole {
  HOD = "hod",
  ADVISOR = "advisor",
  LAB_ATTENDANT = "lab_attendant",
  LECTURER = "lecturer",
}

export const registerSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  password: Joi.string().min(6).required(),
  reg_number: Joi.number().max(11).required(),
  profile_picture: Joi.string().allow(""),
  is_deleted: Joi.boolean().default(false),
  role: Joi.string()
    .valid(...Object.values(AdminRole))
    .default(AdminRole.HOD),
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
