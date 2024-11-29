const Joi = require('joi');

const registerUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      'string.empty': 'Name is required',
      'string.min': 'Name should have at least 3 characters',
      'string.max': 'Name should not exceed 30 characters',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password should have at least 6 characters',
    }),
    age: Joi.number().integer().min(18).required().messages({
      'number.base': 'Age must be a number',
      'number.min': 'Age must be at least 18',
      'any.required': 'Age is required',
    }),
    isAdmin: Joi.boolean().required().messages({
      'boolean.base': 'isAdmin must be a boolean value',
      'any.required': 'isAdmin is required',
    }),
  });

  return schema.validate(data, { abortEarly: false }); // abortEarly: false returns all errors
};

module.exports = { registerUserValidation };
