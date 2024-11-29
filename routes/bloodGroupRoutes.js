const express = require('express');
const router = express.Router();
const bloodGroupController = require('../controllers/bloodGroupController');

router.post('/', bloodGroupController.createDesignation);
router.put('/:id', bloodGroupController.updateDesignation);
router.delete('/:id', bloodGroupController.deleteDesignation);

module.exports = router;
