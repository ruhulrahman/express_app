const Country = require('../models/Country');

exports.createCountry = async (req, res) => {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    await Country.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Country deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
