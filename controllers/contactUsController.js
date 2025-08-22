const ContactUs = require("../models/ContactUs");

const createContact = async (req, res) => {
  try {
    const contact = new ContactUs(req.body);
    await contact.save();
    res.status(201).json({ message: 'Contact created', contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllContact = async (req, res) => {
  try {
    const contact = await ContactUs.find();
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async(req,res)=>{
    const {id} =req.params;
    try{
        const contact = await ContactUs.findByIdAndDelete(id);
        if(!contact){
            return res.status(404).json({message:"Contact Details not Found"});
        }
        return res.status(200).json({message:"Contact details deleted successfully"});
    }
    catch(error){
        console.error("Error deleting investor: ",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

module.exports = {
    createContact,
    getAllContact,
    deleteContact
}