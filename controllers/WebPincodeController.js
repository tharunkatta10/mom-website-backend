const Pincode=require('../models/WebPincode')

const WebPincode = async (req,res)=>{

    try{
       const {pincode}=req.body
       if(!pincode){
        req.status("please enter the pincode")
       }
       const pincodeaddress = new Pincode({
        pincode
       })
       await pincodeaddress.save()
       res.status(200).json({message:"successfully stored the user pincode"})
    }
    catch(e){
          res.status(500).json({message:"failed to store the user pincode"})
    }
}

const getAllCodes = async (req, res) => {
  try {
    const pin = await Pincode.find();
    res.status(200).json(pin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCode = async(req,res)=>{
    const {id} =req.params;
    try{
        const pin = await Pincode.findByIdAndDelete(id);
        if(!pin){
            return res.status(404).json({message:"Pincode Details not Found"});
        }
        return res.status(200).json({message:"Pincode details deleted successfully"});
    }
    catch(error){
        console.error("Error deleting pincode: ",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

module.exports = {
    WebPincode,
    getAllCodes,
    deleteCode
}
