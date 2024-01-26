import Joi from "joi";
import { Semester } from "../interfaces/session.interface";

export const registerSchema = Joi.object().keys({
  name: Joi.string().required(),
  is_current_session: Joi.boolean().default(true),
  semester: Joi.string().valid(...Object.values(Semester)),
  year: Joi.number(),
  is_deleted: Joi.boolean().default(false),
});

export const updateSchema = Joi.object().keys({
  name: Joi.string().required(),
  is_current_session: Joi.boolean().default(true),
  semester: Joi.string().valid(...Object.values(Semester)),
  year: Joi.number(),
  is_deleted: Joi.forbidden(),
});
