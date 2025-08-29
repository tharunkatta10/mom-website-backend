const express = require('express');
const router = express.Router();

const departmentController = require("../controllers/department");

router.post('/department', departmentController.createDepartment);
router.post('/department/job/:departmentid', departmentController.CreateJob);
router.get('/departments', departmentController.getAllDepartments);
router.get("/jobs", departmentController.getAllJobs);
router.get('/department/:id', departmentController.getDepartmentById);
router.put('/department/:id', departmentController.updateDepartment);
router.delete('/department/:id', departmentController.deleteDepartment);
router.put("/department/:departmentId/job/:jobId",departmentController.updateJob);
router.delete("/delete/:departmentId/job/:jobId",departmentController.deleteJob);


router.get('/search',departmentController.searchjobs);

module.exports = router;
