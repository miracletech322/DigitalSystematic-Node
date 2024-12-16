const express = require('express');
const authRoute = require('./auth.route');
const importRoute = require('./import.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/import', importRoute);

module.exports = router;
