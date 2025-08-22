const WebPrescription = require('../models/WebPrescription');
const s3 = require('../config/s3');
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

async function Webpres(req, res) {
  try {
    const { name, contact, gender, age, subject, additionaldetails, address } = req.body;

    if (!req.file || !req.file.location) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!name || !contact || !address) {
      return res.status(400).json({ message: "Please fill all required details" });
    }

    const UserPrescription = new WebPrescription({
      name,
      contact,
      gender,
      age,
      subject,
      additionaldetails,
      address,
      imageurl: req.file.location,
      key: req.file.key
    });

    await UserPrescription.save();

    res.status(200).json({
      message: "Successfully saved the user prescription",
      data: UserPrescription
    });

  } catch (e) {
    console.error("Error saving prescription:", e);
    res.status(500).json({ message: "Failed to save the user prescription" });
  }
}


async function getAllPres(req, res) {
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
        { contact: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;

    const prescriptions = await WebPrescription.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await WebPrescription.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      data: prescriptions
    });
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({ msg: "Internal server error", error });
  }
}

async function deletePres(req, res) {
  try {
    const { id } = req.params;
    const fileKey = req.query.key;

    if (!fileKey) {
      return res.status(400).json({ msg: "File key is required" });
    }

    const deletedPrescription = await WebPrescription.findByIdAndDelete(id);

    if (!deletedPrescription) {
      return res.status(404).json({ msg: "Prescription not found" });
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey
    };

    await s3.send(new DeleteObjectCommand(params));

    res.status(200).json({
      msg: "Prescription deleted successfully",
      status: true,
      deletedPrescription
    });
  } catch (error) {
    console.error("Error deleting prescription:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = { Webpres, getAllPres, deletePres };
