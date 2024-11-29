const mongoose = require('mongoose');

const bloodGroupSchema = new mongoose.Schema({
  type: { type: String, required: true },
});

module.exports = mongoose.model('BloodGroup', bloodGroupSchema);
