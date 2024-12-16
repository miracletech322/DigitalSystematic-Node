const express = require('express');
const { signinAction, signupAction } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signin', signinAction);
router.post('/signup', signupAction);

module.exports = router;
