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

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ errors: { email: 'User not found' } });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ errors: { password: 'Invalid credentials' } });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.logoutUser = (req, res) => {
  res.status(200).json({ msg: 'Logged out successfully' });
};

exports.getUserWithDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('designation', 'title level')
      .populate('country', 'name code')
      .populate('bloodGroup', 'type')
      .select('-password');

    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTop10Users = async (req, res) => {
  try {
    const users = await User.find().sort('name').limit(10).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTop10UsersOrderByCreatedAt = async (req, res) => {
  try {
    const users = await User.find().sort('-createdAt').limit(10).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAdminUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: true }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllNonAdminUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { password: req.body.password }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserDesignation = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { designation: req.body.designation }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserCountry = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { country: req.body.country }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserBloodGroup = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { bloodGroup: req.body.bloodGroup }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserAge = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { age: req.body.age }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserEmail = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { email: req.body.email }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: req.params.name, $options: 'i' } }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsersByBloodGroup = async (req, res) => {
  try {
    const users = await User.find({ bloodGroup: req.params.bloodGroup }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsersByAgeRange = async (req, res) => {
  try {
    const users = await User.find({ age: { $gte: req.params.minAge, $lte: req.params.maxAge } }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsersByCountry = async (req, res) => {
  try {
    const users = await User.find({ country: req.params.country }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsersByDesignation = async (req, res) => {
  try {
    const users = await User.find({ designation: req.params.designation }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ errors: { oldPassword: 'Incorrect password' } });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.resetPassword = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     user.password = hashedPassword;
//     await user.save();
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ errors: { email: 'User not found' } });
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetPasswordUrl = `http://localhost:3000/reset-password/${resetToken}`;
    res.json(resetPasswordUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = req.params.token;
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ errors: { token: 'Invalid or expired token' } });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.isVerified = true;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.sendVerificationEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.isVerified) return res.status(400).json({ errors: { email: 'Email already verified' } });
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.verificationToken = verificationToken;
    await user.save();
    const verificationUrl = `http://localhost:3000/verify-email/${verificationToken}`;
    res.json(verificationUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.verifyEmailToken = async (req, res) => {
  try {
    const verificationToken = req.params.token;
    const user = await User.findOne({ verificationToken });
    if (!user) return res.status(400).json({ errors: { token: 'Invalid or expired token' } });
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.sendResetPasswordEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ errors: { email: 'User not found' } });
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetPasswordUrl = `http://localhost:3000/reset-password/${resetToken}`;
    res.json(resetPasswordUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.verifyPhone = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.isVerified = true;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.sendVerificationPhone = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.isVerified) return res.status(400).json({ errors: { email: 'Phone number already verified' } });
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.verificationToken = verificationToken;
    await user.save();
    const verificationUrl = `http://localhost:3000/verify-phone/${verificationToken}`;
    res.json(verificationUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.verifyPhoneToken = async (req, res) => {
  try {
    const verificationToken = req.params.token;
    const user = await User.findOne({ verificationToken });
    if (!user) return res.status(400).json({ errors: { token: 'Invalid or expired token' } });
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.sendVerificationSMS = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.isVerified) return res.status(400).json({ errors: { email: 'Phone number already verified' } });
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.verificationToken = verificationToken;
    await user.save();
    const verificationUrl = `http://localhost:3000/verify-phone/${verificationToken}`;
    res.json(verificationUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.verifySMSToken = async (req, res) => {
  try {
    const verificationToken = req.params.token;
    const user = await User.findOne({ verificationToken });
    if (!user) return res.status(400).json({ errors: { token: 'Invalid or expired token' } });
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.uploadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.avatar = req.file.path;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.uploadCover = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cover = req.file.path;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.uploadVideos = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.videos.push(req.file.path);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}