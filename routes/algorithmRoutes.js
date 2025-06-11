const express = require('express');
const router = express.Router();
const algorithmController = require('../controllers/algorithmController');

// Route cho trang đọc detail về searching algorithm
router.get('/searching', algorithmController.getSearchingAlgorithmDetailPage);

// Route cho trang algorithms-menu
router.get('/searching/menu', algorithmController.getSearchingMenuPage);

// Route cho trang pathfinding
router.get('/pathfinding', algorithmController.getPathfindingPage);

module.exports = router;