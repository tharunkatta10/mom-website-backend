const mongoose = require("mongoose")

const EmployeeDetailsSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true 
    },
    technicalDesc:{
        type:String,
        required:true 
    },
    nonTechnicalDesc:{
        type:String,
        required:true 
    },
    review:{
        type:String,
        required:true 
    },
    extraCarricular:{
        type:String,
        required:true 
    },
    events:{
        type:String,
        required:true 
    },
    posted_linkedin:{
        type:String,
    },
    date:{
        type:String ,
        required:true
    },
    innovativeIdea:{
        type:String
    },
    isEdit:{
        type:Boolean , 
        default:false
    }
})

const EmployeeDetails= mongoose.model("employeeDetails" , EmployeeDetailsSchema)
module.exports = EmployeeDetails