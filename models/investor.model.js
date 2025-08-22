const mongoose=require('mongoose');
const investorSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    mobile:{
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
    },
    email:{
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    investment:{
        type:String,
        required: true,
    },
    country:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required: true,
    },
    city:{
        type:String,
        required:true,
    },
    background:{
        type: String,
    },
}, {timestamps:true});

module.exports=mongoose.model('Investor', investorSchema);