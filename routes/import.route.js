const express = require('express');
const importController = require('../controllers/import.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/upload', [authMiddleware.checkAuth], importController.uploadAction);

module.exports = router;
