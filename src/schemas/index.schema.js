import Joi from 'joi';

export const registerUser = Joi.object().keys({
  fullname: Joi.string().max(54).required(),
  password: Joi.string().min(8).max(30).required(),
  email: Joi.string().email().required(),
  phone:  Joi.string().required(),
  regNo:  Joi.string().required()
});

export const loginUser = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

export const updateUser = Joi.object().keys({
  fullname: Joi.string(),
  password: Joi.string(),
  email: Joi.string().email(),
  phone:  Joi.string().required(),
  regNo:  Joi.string().required()
})



