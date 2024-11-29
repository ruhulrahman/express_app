const yup = require('yup');

const registerUserValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name should have at least 3 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please provide a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should have at least 6 characters')
    .required('Password is required'),
  age: yup
    .number()
    .min(18, 'Age must be at least 18')
    .required('Age is required'),
  isAdmin: yup
    .boolean()
    .required('isAdmin is required'),
});

module.exports = { registerUserValidation };
