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
      type:String,
        // enum:["Women Career","Early Career","Professional"]
    },
    skills:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    vacancy: {
    type: Number,
  },
    experience:{
        type:String
     },
      employment_type: {
    type: String,
  },
    CurrentDate:{
        type:String
    },     
    expiryDate:{
        type:String
    }
},
  { timestamps: true })

const DepartmentJobSchema = mongoose.Schema(
  {
    department_name: {
      type: String,
      required: true,
    },
    jobUpload: [JobDetails],
  },
  { timestamps: true }
);

module.exports=mongoose.model("Department_JobDetails",DepartmentJobSchema)