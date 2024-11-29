const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: Number, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Designation', designationSchema);
