const express = require('express');
const {
    login,
    register,
    refreshTokenCrl,
    logout,
    forgotPassword,
    resetPassword,
    confirmOtpRegisted, changePassword
} = require('../controllers/Auth');

const router = express.Router();

router.post('/api/auth/register', register);
router.post('/api/auth/confirmOtp', confirmOtpRegisted);

router.post('/api/auth/login', login);

router.post('/api/auth/logout', logout);
router.post('/api/auth/changepassword/:email', changePassword);

router.post('/api/auth/refresh-token', refreshTokenCrl);
router.post('/api/auth/forgotpassword', forgotPassword)
router.post('/api/auth/resetPassword', resetPassword)

//router.post('/social-login', socialLogin, socialLoginUpdateInfo, createToken);

module.exports = router;