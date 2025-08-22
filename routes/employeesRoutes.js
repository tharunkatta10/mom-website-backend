const express = require("express");
const upload = require("../middlewares/employee");
const { EmployeesDetails, getallemployee, getemployeeById , deleteemployee } = require("../controllers/employees");

const router = express.Router()

//upload employees images
router.post("/uploademployee" , upload.single("employeeUrl") , EmployeesDetails)

//get all employees 
router.get("/allemployees", getallemployee )

router.get("/employee/:id", getemployeeById )

router.delete("/deleteemployee/:id", deleteemployee)

module.exports = router