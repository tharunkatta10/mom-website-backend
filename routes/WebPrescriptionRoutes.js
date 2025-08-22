const express=require('express')
const router= express.Router()
const {Webpres,getAllPres}=require('../controllers/WebPrescriptionController')
const upload = require('../middlewares/upload')

router.post('/Prescription',upload.single("imageUrl"),Webpres)
router.get('/Prescription',getAllPres)
module.exports=router