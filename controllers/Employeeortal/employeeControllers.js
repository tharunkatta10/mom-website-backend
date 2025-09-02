const Employee = require("../models/EmployeeDetailsModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

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
    console.log(dateNow);
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
    console.log("there is an error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employee = await Employee.find();
    Employee.updateOne({ technicalDesc, nonTechnicalDesc });
    res.status(200).json(employee);
  } catch (error) {
    console.error("There is an error:", error);
    res.status(500).json({ message: "server error" });
  }
};

const singleEmployee = async (req, res) => {
  const { id, date } = req.params;
  const dateNow = new Date().toISOString().split("T")[0];
  console.log(dateNow);
  try {
    const employee = await Employee.findOne({ userId: id, date: date });
    if (!employee) {
      throw new Error("Data not found");
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.log("there is an error", error);
    res.status(500).json({ message: "server error" });
  }
};

const getUserLearnings = async (req, res) => {
  const { id, dateAdd } = req.params;
  console.log(id, dateAdd);

  const dateAdded = dateAdd;
  if (!dateAdded) {
    return res.status(400).send("Date is required");
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const filteredLearnings = user.learnings.filter(
      (learning) => learning.dateAdded === dateAdded
    );

    if (filteredLearnings.length === 0) {
      return res.status(404).send("No learnings found for the given date");
    }
    console.log(filteredLearnings);

    res.status(200).json(filteredLearnings);
  } catch (err) {
    console.error("Error fetching learnings:", err);
    res.status(500).send("An error occurred while fetching learnings");
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
      }
    );
    console.log(updatedOne);
    res.status(200).send(updatedOne);
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal server error" });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  singleEmployee,
  getUserLearnings,
  updateEmployeeDetails,
};
