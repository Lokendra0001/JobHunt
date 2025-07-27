const { Router } = require('express');
const router = Router();
const User = require('../models/users_model');
const { generateTokenAndSendCookie } = require("../libs/auth");
const { handleUserSignup, handleUserNormalLogin, handleGetCurrentUser, } = require('../controllers/user');
const checkAuthentication = require('../middlewares/auth');

router.post('/signUp', handleUserSignup)

router.post('/normalLogin', handleUserNormalLogin)

router.get('/getCurrentUser', checkAuthentication, handleGetCurrentUser)
module.exports = router;