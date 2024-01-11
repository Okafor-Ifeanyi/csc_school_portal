import Joi from "joi";

export const loginSchema = Joi.object().keys({
  username: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});
