const mongoose = require("mongoose")

const AdminSchema =  new mongoose.Schema({
    name:{
        type:String , 
        required:true 
    } , 
    email:{
        type:String , 
        required:true , 
        unique:true
    } , 
    otp:{
        type:Number , 
    }
})

const Admin = mongoose.model("Edmin" , AdminSchema)
module.exports = Admin