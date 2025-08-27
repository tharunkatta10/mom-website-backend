// const Department = require("../models/JobDetails");

// const createDepartment = async (req, res) => {
//   try {
//     const { department_name, jobUpload } = req.body;
//     const department = new Department({
//       department_name,
//       jobUpload: jobUpload || [],
//     });
//     await department.save();
//     res.status(201).json({ message: "Department created", department });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getAllDepartments = async (req, res) => {
//   try {
//     const { search, page = 1, limit = 6, sortBy = "createdAt", order = "desc", ...filters } = req.query;
//     let query = {};
//     if (search) {
//       query.$or = [
//         { jobName: { $regex: search, $options: "i" } },
//         { jobId: { $regex: search, $options: "i" } },
//         { location: { $regex: search, $options: "i" } },
//         { department_name: { $regex: search, $options: "i" } }
//       ];
//     }
//     if (filters.supportType) {
//       query.supportType = filters.supportType;
//     }
//     const skip = (page - 1) * limit;
//     const departments = await Department.find(query)
//       .sort({ [sortBy]: order === "desc" ? -1 : 1 })
//       .skip(Number(skip))
//       .limit(Number(limit));
//     const total = await Department.countDocuments(query);
//     res.status(200).json({ departments, total });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getDepartmentById = async (req, res) => {
//   try {
//     const department = await Department.findById(req.params.id);
//     if (!department) return res.status(404).json({ message: "Department not found" });
//     res.status(200).json(department);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateDepartment = async (req, res) => {
//   try {
//     const { department_name, jobUpload } = req.body;
//     const department = await Department.findByIdAndUpdate(
//       req.params.id,
//       { department_name, jobUpload },
//       { new: true, runValidators: true }
//     );
//     if (!department) return res.status(404).json({ message: "Department not found" });
//     res.status(200).json({ message: "Department updated", department });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const deleteDepartment = async (req, res) => {
//   try {
//     const department = await Department.findByIdAndDelete(req.params.id);
//     if (!department) return res.status(404).json({ message: "Department not found" });
//     res.status(200).json({ message: "Department deleted", department });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// const deleteD = async (req, res) => {
//   try {
//     const department = await Department.findByIdAndDelete(req.params.id);
//     if (!department) return res.status(404).json({ message: "Department not found" });
//     res.status(200).json({ message: "Department deleted", department });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// const searchjobs = async (req, res) => {
//   try {
//     let { role, location, experience, department, page = 1, limit = 6, sortBy = "date_published", order = "desc" } = req.query;

//     role = role?.trim().toLowerCase();
//     location = location?.trim().toLowerCase();
//     experience = experience?.trim();
//     department = department?.trim().toLowerCase();

//     const departments = await Department.find();
//     let allJobs = [];
//     departments.forEach((dept) => {
//       dept.jobUpload.forEach((job) => {
//         allJobs.push({
//           ...job.toObject(),
//           department_name: dept.department_name,
//         });
//       });
//     });

//     const filteredJobs = allJobs.filter((job) => {
//       const matchRole = role ? new RegExp(role.split(" ").join(".*"), "i").test(job.role?.toLowerCase() || "") : true;
//       const matchLocation = location ? new RegExp(location.split(" ").join(".*"), "i").test(job.location?.toLowerCase() || "") : true;
//       const matchExperience = experience ? parseInt(job.experience || "0") >= parseInt(experience) : true;
//       const matchDepartment = department ? new RegExp(department.split(" ").join(".*"), "i").test(job.department_name?.toLowerCase() || "") : true;
//       return matchRole && matchLocation && matchExperience && matchDepartment;
//     });

//     filteredJobs.sort((a, b) => {
//       if (sortBy === "date_published") {
//         return order === "desc"
//           ? new Date(b.date_published) - new Date(a.date_published)
//           : new Date(a.date_published) - new Date(b.date_published);
//       }
//       if (sortBy === "experience") {
//         return order === "desc"
//           ? parseInt(b.experience || "0") - parseInt(a.experience || "0")
//           : parseInt(a.experience || "0") - parseInt(b.experience || "0");
//       }
//       return 0;
//     });

//     const total = filteredJobs.length;
//     const skip = (page - 1) * limit;
//     const paginatedJobs = filteredJobs.slice(skip, skip + Number(limit));

//     return res.status(200).json({
//       status: true,
//       message: "Search successful",
//       total,
//       page: Number(page),
//       limit: Number(limit),
//       jobUpload: paginatedJobs,
//     });
//   } catch (error) {
//     return res.status(500).json({ status: false, message: "Internal server error", error: error.message });
//   }
// };

// module.exports = {
//   createDepartment,
//   getAllDepartments,
//   getDepartmentById,
//   updateDepartment,
//   deleteDepartment,
//   searchjobs,
// };
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

const getAllDepartments = async (req, res) => {
  try {
    const { search, page = 1, limit = 6, sortBy = "createdAt", order = "desc", ...filters } = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { "jobUpload.role": { $regex: search, $options: "i" } },
        { "jobUpload.jobId": { $regex: search, $options: "i" } },
        { "jobUpload.location": { $regex: search, $options: "i" } },
        { department_name: { $regex: search, $options: "i" } }
      ];
    }
    if (filters.supportType) {
      query.supportType = filters.supportType;
    }
    const skip = (page - 1) * limit;
    const departments = await Department.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(Number(skip))
      .limit(Number(limit));
    const total = await Department.countDocuments(query);
    res.status(200).json({ departments, total, page: Number(page), pages: Math.ceil(total / limit) });
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

async function deleteJob(req, res) {
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


const searchjobs = async (req, res) => {
  try {
    let { role, location, experience, department, page = 1, limit = 10 } = req.query;
    role = role?.trim().toLowerCase();
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
    const filteredJobs = allJobs.filter((job) => {
      const matchRole = role ? new RegExp(role.split(" ").join(".*"), "i").test(job.role?.toLowerCase() || "") : true;
      const matchLocation = location ? new RegExp(location.split(" ").join(".*"), "i").test(job.location?.toLowerCase() || "") : true;
      const matchExperience = experience ? parseInt(job.experience || "0") >= parseInt(experience) : true;
      const matchDepartment = department ? new RegExp(department.split(" ").join(".*"), "i").test(job.department_name?.toLowerCase() || "") : true;
      return matchRole && matchLocation && matchExperience && matchDepartment;
    });
    filteredJobs.sort((a, b) => new Date(b.date_published) - new Date(a.date_published));
    const total = filteredJobs.length;
    const skip = (page - 1) * limit;
    const paginatedJobs = filteredJobs.slice(skip, skip + Number(limit));
    return res.status(200).json({
      status: true,
      message: "Search successful",
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
};
