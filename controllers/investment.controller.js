const Invest = require("../models/investor.model");

const createInvestment = async(req,res)=>{
    try{
        const {name, mobile, email, investment, state, city, background }=req.body;
        if (!name || !mobile || !email || !investment || !country || !state || !city){
            return res.status(400).json({message:"Please fill all the details"});
        }
        const newInvestor = new Invest({
            name,
            mobile,
            email,
            investment,
            country,
            state,
            city,
            background,
        });

        await newInvestor.save();
        res.status(200).json({message:"Successfully Sent"});
    }
    catch(error)
    {
        console.error("Error Sending your data",error);
        res.status(500).json({message:"Something Went Wrong"});
    }
};
const getInvestors= async (req,res) =>{
    try{
        const search = req.query.search || ""
        console.log("this is from search quesry" , search)

        if(search===""){
            const investors = await Invest.find({})
            return res.status(200).send({message:"Welcome admin", investors});
        }
       
        const investors=await Invest.find({ name: { $regex: search , $options: 'i' } });
        return res.status(200).send({message:"Welcome admin", investors});
    }
    catch(error){
        console.error("Error fetching investors: ",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};
const deleteInvestor = async(req,res)=>{
    const {id} =req.params;
    try{
        const investor = await Invest.findByIdAndDelete(id);
        if(!investor){
            return res.status(404).json({message:"Investor not Found"});
        }
        return res.status(200).json({message:"Investor deleted successfully"});
    }
    catch(error){
        console.error("Error deleting investor: ",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};
module.exports={
    createInvestment,
    getInvestors,
    deleteInvestor,
};