const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signin', authController.signinAction);
router.post('/signup', authController.signupAction);

module.exports = router;
