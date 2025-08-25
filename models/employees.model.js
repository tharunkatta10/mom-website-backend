const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  },
  employeedesignation: {
    type: String,
    required: true
  },
  employeeUrl: {
    type: String,
    required: true
  },
  key: {  
    type: String,
    required: true
  },
  Aboutemployee: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeesSchema);
