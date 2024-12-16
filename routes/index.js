const express = require('express');

const authMiddleware = require('./../middlewares/auth.middleware');

const authRoute = require('./auth.route');
const importRoute = require('./import.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/import', [authMiddleware.checkAuth], importRoute);

module.exports = router;
