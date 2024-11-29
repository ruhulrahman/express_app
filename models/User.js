const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  isAdmin: { type: boolean, required: true },
  designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation' },
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  bloodGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodGroup' },
});

module.exports = mongoose.model('User', userSchema);
