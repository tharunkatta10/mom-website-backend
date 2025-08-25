const express=require('express')

const router=express.Router()
const jobDetailsController=require('../controllers/jobDetailsController')

router.post('/jobDetails',jobDetailsController.jobdetails)
router.delete('/deletejob',jobDetailsController.toDeleteJob)
router.get('/displayjobs',jobDetailsController.displayJobs)
router.put('/updatejob/:id',jobDetailsController.editingJob)

module.exports=router