const express = require('express');
const router = express.Router();
const {loginController, registerController, OTPVerification, resetPassword, getUserDetail, createNewPassword} = require('../controller/authController');
const { verifyUser } = require('../controller/authVerify');

router.get('/',verifyUser,getUserDetail);
router.post('/signin' , loginController);
router.post('/reset-password',resetPassword)
router.post('/signup',registerController);
router.post('/otp-verify/:id',OTPVerification)
router.post("/new-password",createNewPassword)
module.exports = router;