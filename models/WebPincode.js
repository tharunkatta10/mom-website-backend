const mongoose=require('mongoose')

const PincodeSchema=mongoose.Schema({
    pincode:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('PincodeSchema',PincodeSchema)