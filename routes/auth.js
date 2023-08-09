const express = require('express');
const router = express.Router();
const {signup,signin,requireSignin,verfiyemail,resend,updateUserProfile,getprofile,forgetPasswordEmailVerified,
    forgetPasswordEmailVerified_resend,resetforgetPassword}=require('../controller/user')
 const upload = require("../utils/multerConfig");
/* GET users listing. */
router.post('/signup', signup)
router.post('/login', signin)
router.get('/get_userprofile/:id', getprofile)
router.post('/account-verify', verfiyemail);
router.post('/resend', resend);
router.put("/update_Profile/:id", updateUserProfile);
router.post("/account_verified_forgetPassword", forgetPasswordEmailVerified);
router.post("/account_verified_forgetPassword_resend", forgetPasswordEmailVerified_resend);
router.post("/resetPassword", resetforgetPassword)

module.exports = router;
