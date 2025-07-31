const { Router } = require('express');
const router = Router();
const { handleUserSignup, handleUserNormalLogin, handleGetCurrentUser, handleLogoutUser, } = require('../controllers/user');
const checkAuthentication = require('../middlewares/auth');
const upload = require('../config/cloudinayConfig')

router.post('/signUp', handleUserSignup)

router.post('/normalLogin', handleUserNormalLogin)

router.get('/getCurrentUser', checkAuthentication, handleGetCurrentUser);

router.get('/logoutUser', checkAuthentication, handleLogoutUser);

module.exports = router;