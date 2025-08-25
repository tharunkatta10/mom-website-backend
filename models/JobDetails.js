const mongoose=require('mongoose')

const JobDetails=mongoose.Schema({
    jobName:{
        type:String,
        required:true
    },
    jobId:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    // type:{
    //     enum:["women ","professional","earlycareer"]
    // },
    skills:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    currentDate:{
        type:String
    },
    schedhuleDate:{
        type:String
    },
    expiryDate:{
        type:String
    }
})

module.exports=mongoose.model("jobDetails",JobDetails)