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
    res.status(201).json({ message: "Investor created successfully", data: newInvestor });
  } catch (error) {
    console.error("Error creating investor:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getInvestors = async (req, res) => {
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
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;

    const investors = await Invest.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Invest.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      investors
    });
  } catch (error) {
    console.error("Error fetching investors:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
