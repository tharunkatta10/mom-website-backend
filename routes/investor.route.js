const express=require('express');
const investorcontroller=require('../controllers/investment.controller');
const router = express.Router();

router.post('/add', investorcontroller.createInvestment);
router.get('/investors',investorcontroller.getInvestors);
router.delete('/delete/:id',investorcontroller.deleteInvestor);
module.exports=router;