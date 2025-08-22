const express = require('express');
const router = express.Router();

const departmentController = require("../controllers/department");

router.post('/department', departmentController.createDepartment);
router.get('/departments', departmentController.getAllDepartments);
router.get('/department/:id', departmentController.getDepartmentById);
router.put('/department/:id', departmentController.updateDepartment);
router.delete('/department/:id', departmentController.deleteDepartment);
router.get('/search',departmentController.searchjobs);

module.exports = router;
