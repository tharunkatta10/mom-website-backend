const Invest = require("../models/investor.model");

const createInvestment = async (req, res) => {
  try {
    const { name, mobile, email, investment, country, state, city, background } = req.body;

    if (!name || !mobile || !email || !investment || !country || !state || !city) {
      return res.status(400).json({ message: "Please fill all the required details" });
    }
  
    const exists = await Invest.findOne({ $or: [{ email }, { mobile }] });
    if (exists) {
      return res.status(400).json({ message: "Investor with this email or mobile already exists" });
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
    res.status(201).json({ message: "Investor created successfully"});
  } catch (error) {
    console.error("Error creating investor:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getInvestors = async (req, res) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const query = search
            ? { name: { $regex: search, $options: "i" } }
            : {};

        const total = await Invest.countDocuments(query);

        const investors = await Invest.find(query)
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            message: "Investors fetched successfully",
            investors,
            total,
        });
    } catch (error) {
        console.error("Error fetching investors:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteInvestor = async (req, res) => {
  const { id } = req.params;
  try {
    const investor = await Invest.findByIdAndDelete(id);
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }
    return res.status(200).json({ message: "Investor deleted successfully" });
  } catch (error) {
    console.error("Error deleting investor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createInvestment,
  getInvestors,
  deleteInvestor,
};
