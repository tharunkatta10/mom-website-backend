const express = require('express')
const router = express.Router()
const employeeController = require("../controllers/employeeControllers")


// get, post, put/putch, delete

router.post('/employeeDetails/:id', employeeController.createEmployee)
router.get('/employeeDetails', employeeController.getEmployees)
router.get('/emplyee/:id/:date', employeeController.singleEmployee)
router.get('/learnings/:id',employeeController.getUserLearnings)
router.put("/employee/:id" , employeeController.updateEmployeeDetails)

module.exports = router