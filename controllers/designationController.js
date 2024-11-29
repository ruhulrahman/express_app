const Designation = require('../models/Designation');

exports.createDesignation = async (req, res) => {
  try {
    const designation = new Designation(req.body);
    await designation.save();
    res.status(201).json(designation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(designation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDesignation = async (req, res) => {
  try {
    await Designation.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Designation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
