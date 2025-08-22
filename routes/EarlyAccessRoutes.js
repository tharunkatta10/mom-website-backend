const express=require('express')
const router=express.Router()
const EarlyAccess=require('../controllers/EarlyAccessController')

router.post('/EAccess',EarlyAccess.emailAccess)
router.get('/access',EarlyAccess.getAllEmails)
router.delete('/delete/:id',EarlyAccess.deleteAccess)
module.exports= router