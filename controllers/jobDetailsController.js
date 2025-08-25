const details=require('../models/JobDetails')

//create job
const jobdetails= async(req,res)=>{
    try{
    const{jobName,jobId,location,type,skills,jobDescription,currentDate,schedhuleDate,expiryDate}=req.body
        if(!jobName || !jobId || !location || !type || !skills || !jobDescription || !currentDate || !schedhuleDate || !expiryDate){
            return res.status(400).json({message:"please fill all the details"})            
        }
        const newJobDetails=new details({
            jobName,
            jobId,
            location,
            type,
            skills,
            jobDescription,
            currentDate,
            schedhuleDate,
            expiryDate
        })    
        await newJobDetails.save()
        return res.status(200).json({message:"Job Created Successfully"})    
    }
    catch(e){
        console.error("error while saving the job details",e)
       res.status(500).json({message:"Unable to Save the job details"})
    }
}


//get all jobs
const displayJobs=async(req,res)=>{
    try{
           const alljobs= await details.find({})
           if(!alljobs){
            return res.status(400).json({message:"unable to fetch the jobs"})
           }
           return res.status(200).json({message:" All jobs",alljobs})
    }
    catch(e){
          console.error("unable to display the jobs")
          return res.status(400).josn({message:"Internal Server Error"})
    }
}

//delete job
const toDeleteJob= async(req,res)=>{
        const {jobId}=req.body        
    try{
        const deleteJob= await details.findOneAndDelete(jobId)
          if(!deleteJob){
            return res.status(400).json({message:"Job details not found"})
          }
          return res.status(200).json({message:"Job deleted successfully!!!!!"})
    }
    catch(e){
          console.error("Error deleting job",e)
          return res.status(500).json({message:"Internal Server Error "})
    }
}



//edit job details
const editingJob= async(req,res)=>{      
    const jobId=req.params.id
    console.log("....jobId",jobId)
      try{
        
         const editJobs= await details.findByIdAndUpdate(jobId,req.body)
        //  if(!editJobs){
        //     return res.status(400).json({message:"unable to find and update the job"})
        //  }
         return res.status(200).json({message:"successfully updated the job profile",editJobs})
      }
      catch(e){
        console.log(e)
         return res.status(500).json({message:"Internal Server Error"})
      }
}
module.exports={jobdetails,toDeleteJob,displayJobs,editingJob}