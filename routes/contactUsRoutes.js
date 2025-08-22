const express = require('express')
const  router = express.Router()
const ContactUsController = require("../controllers/contactUsController")

router.post('/contact', ContactUsController.createContact)
router.get('/allcontact', ContactUsController.getAllContact)
router.delete('/delete/:id',ContactUsController.deleteContact)

module.exports = router 