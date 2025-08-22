const express=require('express')
const router=express.Router()
const Pincode=require('../controllers/WebPincodeController')

router.post('/P',Pincode.WebPincode)
router.get('/pin',Pincode.getAllCodes)
router.delete('/delete/:id',Pincode.deleteCode)

module.exports=router