import Joi from "joi";

export const registerSchema = Joi.object().keys({
  session_id: Joi.string().required(),
  student_id: Joi.string().required(),
});

export const generateClassSchema = Joi.object().keys({
    session_id: Joi.string().required(),
    class_id: Joi.string().required(),
});
