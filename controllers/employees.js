const s3 = require('../config/s3')
const employeesSchema = require("../models/employees.model")
const { DeleteObjectCommand } = require("@aws-sdk/client-s3")

async function EmployeesDetails(req, res) {
    try {
        console.log("this is upload", req.file)
        const employeeUrl = req.file.location
        console.log("this is employee details" , req.body)
        const {employeeName , employeedesignation , Aboutemployee} = req.body
        if (!employeeUrl) {
            return res.status(404).json({ msg: "Please provide the img" })
        }
      
        const employeeimg = new employeesSchema({
            employeeUrl,
            key: req.file.key,
            employeeName , employeedesignation , Aboutemployee
        })

        await employeeimg.save()
        res.status(200).json({ msg: "uploaded successfully", status: true, data: employeeimg })

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Internal server error", error: err })
    }

}
async function getallemployee(req, res) {
    try {
        const employee = await employeesSchema.find();
        res.status(200).json({ data: employee });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error })
    }
}
async function getemployeeById(req, res) {
    try{
        const {id} = req.params
        console.log(id)
        const getemployee = await employeesSchema.findOne({_id:id});
        console.log( getallemployee)
        res.status(200).json({employee:getemployee});
    }catch(error){
        res.status(500).json({msg:"Internal server error", error})
    }
}
async function deleteemployee(req, res){
    try{
        console.log("Bucket: ", process.env.AWS_BUCKET_NAME)
        const fileKey = req.query.key
        const employeeId = req.params.id
        console.log("this is key file", fileKey)
        if(!fileKey){
            return res.status(400).json({msg:"File key doesn't match"})
        }
        const deleteEmployee = await employeesSchema.deleteOne({_id:employeeId})
        const params = {
            Bucket:process.env.AWS_BUCKET_NAME,
            key:fileKey
        }
        await S3.send(new DeleteObjectCommand(params));
        res.status(200).json({msg:"Deleted successfully", status:true, deleteEmployee})
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Internal server error"})
    }
}

module.exports = {
    EmployeesDetails,
    getallemployee,
    getemployeeById,
    deleteemployee,
}