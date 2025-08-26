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
    type:{
        enum:["Women Career","Early Career","Professional"]
    },
    skills:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    experience:{
        type:String
     },
    CurrentDate:{
        type:String
    },     
    expiryDate:{
        type:String
    }
})

module.exports=mongoose.model("jobDetails",JobDetails)