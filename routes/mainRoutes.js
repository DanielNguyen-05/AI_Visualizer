const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Route cho trang chủ
router.get('/', mainController.getHomePage);

// Route cho trang giới thiệu
router.get('/about', mainController.getAboutPage);

module.exports = router;