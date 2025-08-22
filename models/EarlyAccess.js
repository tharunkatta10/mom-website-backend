const mongoose=require('mongoose')
const EarlyAccess=mongoose.Schema({
    email:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model('EarlyAccess',EarlyAccess)