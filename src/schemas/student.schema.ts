import Joi from "joi";

enum StudentRole {
  course_rep = "Course Rep",
  assistant_course_rep = "Assistant Course Rep",
  regular = "Regular",
}

export const registerSchema = Joi.object().keys({
  reg_number: Joi.number().required(),
  email: Joi.string().email().allow(),
  password: Joi.string().min(8).max(30).required(),
  full_name: Joi.string().required(),
  class_id: Joi.string().length(24).hex().required(),
  phone_number: Joi.string(),
  is_verified: Joi.boolean().default(true),
  profile_picture: Joi.string().allow(""),
  is_deleted: Joi.boolean().default(false),
  role: Joi.string()
    .valid(...Object.values(StudentRole))
    .default(StudentRole.regular),
});

export const uploadSchema = Joi.object().keys({
  class_list: Joi.binary().encoding("base64").required(),
  class_id: Joi.string().length(24).hex().required(),
});

export const loginSchema = Joi.object().keys({
  reg_number: Joi.number().required(),
  password: Joi.string().min(8).max(30).required(),
});

export const updateSchema = Joi.object().keys({
  full_name: Joi.string().allow(""),
  phone_number: Joi.string().allow(""),
  profile_picture: Joi.string().allow(""),
  reg_number: Joi.forbidden(),
  role: Joi.forbidden(),
  is_deleted: Joi.forbidden(),
});
