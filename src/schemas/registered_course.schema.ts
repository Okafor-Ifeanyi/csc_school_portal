import Joi from "joi";

export const registerSchema = Joi.object().keys({
  session_id: Joi.string().required(),
  student_id: Joi.string(),
  course_id: Joi.string().required(),
  code: Joi.string(),
  test_score: Joi.number(),
  lab_score: Joi.number(),
  exam_score: Joi.number(),
  total_score: Joi.number(),
  grade: Joi.string(),
  remark: Joi.string(),
  is_deleted: Joi.forbidden(),
});

export const updateSchema = Joi.object().keys({
  test_score: Joi.number(),
  lab_score: Joi.number(),
  exam_score: Joi.number(),
  // total_score: Joi.number(),
  // grade: Joi.string(),
  remark: Joi.string(),
});
