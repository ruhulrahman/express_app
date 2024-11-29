const BloodGroup = require('../models/BloodGroup');

exports.createBloodGroup = async (req, res) => {
  try {
    const bloodGroup = new BloodGroup(req.body);
    await bloodGroup.save();
    res.status(201).json(bloodGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBloodGroup = async (req, res) => {
  try {
    const bloodGroup = await BloodGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bloodGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBloodGroup = async (req, res) => {
  try {
    await BloodGroup.findByIdAndDelete(req.params.id);
    res.json({ msg: 'BloodGroup deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
