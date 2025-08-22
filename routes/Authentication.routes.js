const express = require("express")
const { createUser  , registerOtpVerified , sendOtpViaEmail  , loginViaEmail} = require("../controllers/Authentication.controller")
const router = express.Router() 


//register by email
router.post("/create-admin" , createUser)

// register after otp verification
router.post('/verifyOtpSignup' , registerOtpVerified)


// sending otp for login 
router.post("/login-admin" , sendOtpViaEmail)

//verifying otp for login\
router.post("/login-verfication" , loginViaEmail)


module.exports = router