const Department = require("../models/JobDetails");

const createDepartment = async (req, res) => {
  try {
    const { department_name, jobUpload } = req.body;
    const department = new Department({
      department_name,
      jobUpload: jobUpload || [],
    });
    await department.save();
    res.status(201).json({ message: "Department created", department });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const CreateJob = async (req, res) => {
  console.log(req.params.departmentid)
  try {
    const dept = await Department.findById(req.params.departmentid);
    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

    dept.jobUpload.push(req.body);
    await dept.save();

    res.status(200).json({ message: "Job created successfully", department: dept });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


const getAllDepartments = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 3,
      sortBy = "createdAt",
      order = "desc",
      ...filters
    } = req.query;

    let query = {};
    if (filters.supportType) {
      query.supportType = filters.supportType;
    }
    const departments = await Department.find(query);
    let allJobs = [];
    departments.forEach((dept) => {
      dept.jobUpload.forEach((job) => {
        allJobs.push({
          ...job.toObject(),
          department_name: dept.department_name,
          deptId: dept._id,
        });
      });
    });

   
    if (search) {
      const regex = new RegExp(search, "i");
      allJobs = allJobs.filter(
        (job) =>
          regex.test(job.jobName || "") ||
          regex.test(job.jobId || "") ||
          regex.test(job.location || "") ||
          regex.test(job.department_name || "")
      );
    }

 
    allJobs.sort((a, b) => {
      if (sortBy === "createdAt") {
        return order === "desc"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

    const total = allJobs.length;
    const start = (page - 1) * limit;
    const paginatedJobs = allJobs.slice(start, start + Number(limit));

    res.status(200).json({
      departments: paginatedJobs,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { department_name, jobUpload } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { department_name, jobUpload },
      { new: true, runValidators: true }
    );
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.status(200).json({ message: "Department updated", department });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.status(200).json({ message: "Department deleted", department });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const deleteJob = async (req, res) =>{
  try {
    const { departmentId, jobId } = req.params;
    const department = await Department.findById(departmentId);
    if (!department) return res.status(404).json({ msg: "Department not found" });

    const jobIndex = department.jobUpload.findIndex(job => job._id.toString() === jobId);
    if (jobIndex === -1) return res.status(404).json({ msg: "Job not found" });

    department.jobUpload.splice(jobIndex, 1);
    await department.save();

    res.json({ msg: "Job deleted successfully", department });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}


const updateJob = async (req, res) => {
  try {
    const { departmentId, jobId } = req.params;
    const updatedJobData = req.body;


    const department = await Department.findById(departmentId);
    if (!department) return res.status(404).json({ message: "Department not found" });


    const jobIndex = department.jobUpload.findIndex(
      (job) => job._id.toString() === jobId
    );
    if (jobIndex === -1) return res.status(404).json({ message: "Job not found" });

  
    department.jobUpload[jobIndex] = {
      ...department.jobUpload[jobIndex].toObject(),
      ...updatedJobData,
    };

    await department.save();

    res.status(200).json({
      message: "Job updated successfully",
      department,
      updatedJob: department.jobUpload[jobIndex],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



const searchjobs = async (req, res) => {
  try {
    let { jobName, location, experience, department, page = 1, limit = 10 } = req.query;

    // Trim and normalize input
    jobName = jobName?.trim().toLowerCase();
    location = location?.trim().toLowerCase();
    experience = experience?.trim();
    department = department?.trim().toLowerCase();

    const departments = await Department.find();

    let allJobs = [];
    departments.forEach((dept) => {
      dept.jobUpload.forEach((job) => {
        allJobs.push({
          ...job.toObject(),
          department_name: dept.department_name,
        });
      });
    });

    // Apply filters
    const filteredJobs = allJobs.filter((job) => {
      const matchRole = jobName ? new RegExp(jobName.split(" ").join(".*"), "i").test(job.jobName?.toLowerCase() || "") : true;
      const matchLocation = location ? new RegExp(location.split(" ").join(".*"), "i").test(job.location?.toLowerCase() || "") : true;
      const matchExperience = experience ? parseInt(job.experience || "0") >= parseInt(experience) : true;
      const matchDepartment = department ? new RegExp(department.split(" ").join(".*"), "i").test(job.department_name?.toLowerCase() || "") : true;

      return matchRole && matchLocation && matchExperience && matchDepartment;
    });

    // Sort by creation date
    filteredJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const total = filteredJobs.length;
    const skip = (page - 1) * limit;
    const paginatedJobs = filteredJobs.slice(skip, skip + Number(limit));

    return res.status(200).json({
      status: true,
      message: "Filter applied successfully",
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      jobUpload: paginatedJobs,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  searchjobs,
  deleteJob,
  CreateJob,
  updateJob,
  
};
