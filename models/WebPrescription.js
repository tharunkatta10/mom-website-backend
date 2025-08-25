const mongoose = require('mongoose');

const WebPrescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  gender: {
    type: String,
    enum: ["male", "female", "not preferable"]
  },
  age: {
    type: String
  },
  subject: {
    type: String
  },
  additionaldetails: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  imageurl: {
    type: String,
    required: true
  },
  key: { 
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('WebPrescription', WebPrescriptionSchema);
