import Joi from "joi";

export const registerSchema = Joi.object().keys({
  name: Joi.string().required(),
  enrollement_year: Joi.string().required(),
  current_level: Joi.string(),
  has_graduated: Joi.boolean().default(true),
  is_deleted: Joi.boolean().default(false),
  department: Joi.string().default("Computer Science"),
});

export const updateSchema = Joi.object().keys({
  name: Joi.string().allow(),
  enrollement_year: Joi.string().allow(),
  current_level: Joi.string(),
  has_graduated: Joi.boolean().default(true),
  is_deleted: Joi.boolean().default(false),
  department: Joi.string().default("Computer Science"),
});
