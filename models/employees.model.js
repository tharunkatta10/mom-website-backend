const mongoose = require('mongoose');

const employeesSchema = mongoose.Schema({
    employeeName:{
        type:String
    },
    employeedesignation:{
        type: String
    },
    employeeUrl:{
        type: String
    },
    Aboutemployee:{
        type: String
    }
},{timestamps:true})
module.exports=mongoose.model('employeesSchema',employeesSchema)