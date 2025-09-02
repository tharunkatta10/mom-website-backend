const express = require("express")
const { verifyAdmin } = require("../middlewares/verifyAdmin")
const userControllers = require("../controllers/userControllers")
const router = express.Router()

router.get("/user" , verifyAdmin , userControllers.getUsers)
router.get("/userDetails/:id" , userControllers.getUserDetails)

router.post("/user/login" , userControllers.LoginUser)

router.post("/user" ,verifyAdmin , userControllers.createUser)
router.delete("/user/:id" ,verifyAdmin ,userControllers.deleteUsers)

module.exports = router