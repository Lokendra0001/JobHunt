const { Router } = require('express');
const router = Router();
const User = require('../models/users_model');
const { generateTokenAndSendCookie } = require("../libs/auth");
const { handleUserSignup, handleUserNormalLogin, } = require('../controllers/user');

router.post('/signUp', handleUserSignup)

router.post('/normalLogin', handleUserNormalLogin)


module.exports = router;