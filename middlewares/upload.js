const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: (req, file, cb) => {
      console.log(file);
      cb(null, { fieldName: file.originalname });
    },
    key: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null,`${process.env.AWS_PRESCRIPTION_FOLDER}${uniqueName}`);
    }
  })
});

module.exports = upload;
