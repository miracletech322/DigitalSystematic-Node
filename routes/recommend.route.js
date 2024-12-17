const express = require('express');
const recommendController = require('../controllers/recommend.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/update', [authMiddleware.checkAuth], recommendController.updateAction);

module.exports = router;
