const express = require('express');
const router = express.Router();
const randomController = require('../controllers/randomController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getrandomdata',authMiddleware,randomController.getUsers);


module.exports = router;
