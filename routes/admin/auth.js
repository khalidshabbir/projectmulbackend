const express = require('express');
const router = express.Router();
const {signup,signin,requireSignin}=require('../../controller/admin/admin')

/* GET users listing. */


router.post('/admin/signup', signup)
router.post('/admin/signin', signin)
router.post('/admin/profile', requireSignin,(req,res)=>{
res.status(200).json({user:"Admin Profile"})
})


module.exports = router;
