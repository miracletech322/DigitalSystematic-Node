const express = require('express');
const recommendController = require('../controllers/recommend.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/update', [authMiddleware.checkAuth], recommendController.updateAction);
router.post('/users', [authMiddleware.checkAuth], recommendController.usersAction);
router.post('/individual', [authMiddleware.checkAuth], recommendController.individualAction);

module.exports = router;
