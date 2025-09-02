const express = require("express")
const userControllers = require("../../controllers/Employeeortal/userControllers")
const router = express.Router()

router.get("/user" , userControllers.getUsers)
router.get("/userDetails/:id" , userControllers.getUserDetails)

router.post("/user/login" , userControllers.LoginUser)

router.post("/user"  , userControllers.createUser)
router.delete("/user/:id" ,userControllers.deleteUsers)

module.exports = router