const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.post('/', countryController.createDesignation);
router.put('/:id', countryController.updateDesignation);
router.delete('/:id', countryController.deleteDesignation);

module.exports = router;
