const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.getHomePage);
router.get('/about', mainController.getAboutPage);
router.get('/algorithm', mainController.getAlgorithmPage);
router.get('/guide', mainController.getGuidePage);

module.exports = router;