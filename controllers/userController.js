const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const { registerUserValidation } = require('../validations/userJoiValidation');
const { registerUserValidation } = require('../validations/userYupValidation');
const { getErrorDetails } = require('../utils/util');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate user input
  // const { error } = registerUserValidation(req.body); // joi validation
  await registerUserValidation.validate(req.body, { abortEarly: false });

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ errors: { email: 'User already exists' } });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword, age, isAdmin });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    getErrorDetails(error, res)
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
