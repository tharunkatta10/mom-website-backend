const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
  },
  location: {
    type: String,
  },
  vacancy: {
    type: Number,
  },
  job_no: {
    type: String,
  },
  travel: {
    type: Boolean,
  },
  job_category: {
    type: String,
  },
  date_published: {
    type: Date,
    default: Date.now,
  },
  employment_type: {
    type: String,
  },
  work_model: {
    type: String,
  },
  role_description: {
    type: String,
  },
  eligibility: {
    type: String,
  },
  about_employee: {
    type: String,
  },
  we_offer: {
    type: String,
  },
  employee_expect: {
    type: String,
  },
});

const DepartmentJobSchema = new Schema(
  {
    department_name: {
      type: String,
      required: true,
    },
    jobUpload: [JobSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('DepartmentJob', DepartmentJobSchema);
