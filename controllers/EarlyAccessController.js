const Access=require('../models/EarlyAccess')

 const emailAccess = async (req,res)=>{
    try{
     const {email}=req.body
     if(!email){
        res.status(400).json({message:"please enter the email"})
     }
     const newEmail= new Access({
        email
     })
     await newEmail.save()
     res.status(200).json({message:"email submitted successfully for early access"})
    }
    catch(e){
        console.log("error",e);
        res.status(500).json({message:"failed to submit mail to early access"})
    }
}

const getAllEmails = async (req, res) => {
  try {
    const aces = await Access.find();
    res.status(200).json(aces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAccess = async(req,res)=>{
    const {id} =req.params;
    try{
        const aces = await Access.findByIdAndDelete(id);
        if(!contact){
            return res.status(404).json({message:"Early Access Details not Found"});
        }
        return res.status(200).json({message:"Access details deleted successfully"});
    }
    catch(error){
        console.error("Error deleting access: ",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

module.exports = {
    emailAccess,
    getAllEmails,
    deleteAccess
}