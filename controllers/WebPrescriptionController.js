const WebPrescription=require('../models/WebPrescription');

async function Webpres(req,res){

    try{
        const {name,contact,gender,age,subject,additionaldetails,address}=req.body
          const imageurl = req.file.location 
        if(!name || !contact || !address || !imageurl){
            return res.status(400).json({message:"please fill all the details"})
        }
        
        const UserPrescription = new  WebPrescription({
            name,contact,gender,age,subject,additionaldetails,address,imageurl,key:req.file.key
        })
        await UserPrescription.save()
        res.status(200).json({message:"succesfully saved the user prescription",data:UserPrescription})
    }
    catch(e){
        console.log("error",e);
        res.status(500).json({message:"failed to save the user prescription"})
        
    }
}

async function getAllPres(res, res){
   try{   
          const precription = await WebPrescription.find();
          res.status(200).json({data: precription});
      }catch(error){
          res.status(500).json({msg:"Internal server error" , error})
      }
}

module.exports={Webpres,getAllPres}