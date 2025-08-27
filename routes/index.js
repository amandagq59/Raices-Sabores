const express = require('express');
const indexControllers = require('../controllers/indexControllers');
const uploadFile = require('../middleware/multer');
const router = express.Router();

//1) http://localhost:4000/listfoodie (Lista todos los foodies)
router.get('/', indexControllers.showFoodiesList);
module.exports = router;
