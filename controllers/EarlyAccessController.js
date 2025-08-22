const Access = require('../models/EarlyAccess');
const emailAccess = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please enter the email" });
    }
    const exists = await Access.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered for early access" });
    }

    const newEmail = new Access({ email });
    await newEmail.save();

    res.status(200).json({ message: "Email submitted successfully for early access" });
  } catch (e) {
    console.error("Error creating email:", e);
    res.status(500).json({ message: "Failed to submit email for early access" });
  }
};

const getAllEmails = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
      ...filters
    } = req.query;

    let query = { ...filters };

    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;

    const emails = await Access.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Access.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      data: emails
    });
  } catch (err) {
    console.error("Error fetching emails:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteAccess = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Access.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Early Access details not found" });
    }
    return res.status(200).json({ message: "Access details deleted successfully" });
  } catch (error) {
    console.error("Error deleting access:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  emailAccess,
  getAllEmails,
  deleteAccess
};
