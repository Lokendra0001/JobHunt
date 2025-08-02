const { Router } = require('express');
const router = Router();
const { handleUserSignup, handleUserNormalLogin, handleGetCurrentUser, handleLogoutUser, handleAddProjectId, handlGetAllAppliedForm, } = require('../controllers/user');
const checkAuthentication = require('../middlewares/auth');
const upload = require('../config/cloudinayConfig')

router.post('/signUp', handleUserSignup)

router.post('/normalLogin', handleUserNormalLogin)

router.get('/getCurrentUser', checkAuthentication, handleGetCurrentUser);

router.get('/logoutUser', checkAuthentication, handleLogoutUser);

router.patch('/add-projectId', checkAuthentication, handleAddProjectId)

router.get('/get-allAppliedForm', checkAuthentication, handlGetAllAppliedForm)
module.exports = router;