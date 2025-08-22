const ContactUs = require("../models/ContactUs");

const createContact = async (req, res) => {
  try {
    const contact = new ContactUs(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact created", contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllContact = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sortBy = "createdAt", order = "desc", ...filters} = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { supportType: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    if (filters.supportType) {
      query.supportType = filters.supportType;
    }
    const skip = (page - 1) * limit;
    const contacts = await ContactUs.find(query).sort({ [sortBy]: order === "desc" ? -1 : 1 }).skip(Number(skip)).limit(Number(limit));
    const total = await ContactUs.countDocuments(query);
    res.status(200).json({total, page: Number(page), limit: Number(limit),contacts,});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await ContactUs.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createContact,
  getAllContact,
  deleteContact,
};
