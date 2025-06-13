const express = require('express');
const router = express.Router();
const searchingController = require('../controllers/searchingController');

router.get('/', searchingController.getSearchingPage); 
router.get('/menu', searchingController.getSearchingMenuPage);
router.get('/bfs', searchingController.getBFSPage);
router.get('/dfs', searchingController.getDFSPage);
router.get('/ucs', searchingController.getUCSPage);
router.get('/a-star', searchingController.getAStarPage);
router.get('/iddfs', searchingController.getIDDFSPage);
router.get('/ida-star', searchingController.getIDAStarPage);
router.get('/beam', searchingController.getBEAMPage);
router.get('/bi-direct', searchingController.getBIDIRECTPage);



module.exports = router;