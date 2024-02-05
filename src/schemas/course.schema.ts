import Joi from "joi";

export const registerSchema = Joi.object().keys({
  session_id: Joi.string().required(),
  class_id: Joi.string().required(),
  title: Joi.string().required(),
  code: Joi.string().required(),
  is_elective: Joi.boolean().default(false),
  unit: Joi.number().max(6).required(),
  is_deleted: Joi.forbidden(),
  description: Joi.string(),
});

export const updateSchema = Joi.object().keys({
  is_elective: Joi.boolean().default(false),
  unit: Joi.number().max(6),
  is_deleted: Joi.forbidden(),
  description: Joi.string(),
});
// export const updateSchema = Joi.object().keys({
//   session_id: Joi.string().required(),
//   class_id: Joi.string().required(),
//   title: Joi.string().required(),
//   is_elective: Joi.boolean().default(false),
//   unit: Joi.number().required(),
//   is_deleted: Joi.forbidden(),
//   description: Joi.string()
// });
