const mongoose = require('mongoose');

const contactUsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
    supportType:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{
  timestamps: true
}

)
module.exports = mongoose.model('ContactUs', contactUsSchema);