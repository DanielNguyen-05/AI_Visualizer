const express = require('express');
const router = express.Router();
const searchingController = require('../controllers/searchingController');

router.get('/', searchingController.getSearchingPage); 
router.get('/menu', searchingController.getSearchingMenuPage);
router.get('/ida-star', searchingController.getIDAStarPage);
router.get('/ucs', searchingController.getUCSPage);

module.exports = router;