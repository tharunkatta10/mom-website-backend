const Employee = require("../../models/Employeeportal/EmployeeDetailsModel");
const User = require("../../models/Employeeportal/UserModel");

const createEmployee = async (req, res) => {
  const { id } = req.params; 
  try {
    const {
      technicalDesc,
      nonTechnicalDesc,
      review,
      extraCarricular,
      events,
      posted_linkedin,
      innovativeIdea,
    } = req.body;

    const dateNow = new Date().toISOString().split("T")[0];

    const employee = new Employee({
      userId: id,
      technicalDesc,
      innovativeIdea,
      nonTechnicalDesc,
      review,
      extraCarricular,
      events,
      posted_linkedin,
      date: dateNow,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const singleEmployee = async (req, res) => {
  const { id, date } = req.params;

  try {
    const employee = await Employee.findOne({ userId: id, date });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getUserLearnings = async (req, res) => {
  const { id, dateAdd } = req.params;

  if (!dateAdd) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const filteredLearnings = user.learnings.filter(
      (learning) => learning.dateAdded === dateAdd
    );

    if (filteredLearnings.length === 0) {
      return res
        .status(404)
        .json({ message: "No learnings found for the given date" });
    }

    res.status(200).json(filteredLearnings);
  } catch (err) {
    console.error("Error fetching learnings:", err);
    res.status(500).json({ message: "An error occurred while fetching learnings" });
  }
};

const updateEmployeeDetails = async (req, res) => {
  const { id } = req.params; 
  const {
    technicalDesc,
    nonTechnicalDesc,
    review,
    extraCarricular,
    events,
    posted_linkedin,
    innovativeIdea,
  } = req.body;

  try {
    const updatedOne = await Employee.findOneAndUpdate(
      { _id: id },
      {
        technicalDesc,
        nonTechnicalDesc,
        review,
        extraCarricular,
        events,
        posted_linkedin,
        innovativeIdea,
        isEdit: true,
      },
      { new: true } 
    );

    if (!updatedOne) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedOne);
  } catch (e) {
    console.error("Error updating employee:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  singleEmployee,
  getUserLearnings,
  updateEmployeeDetails,
};
