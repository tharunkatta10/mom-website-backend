const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")

const Admin = require("../models/Admins")


//creating transport 
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "otpmompharmacy@gmail.com",
        pass: "kljosvcrerisevqm"
    }

})



//create user 
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body
        let admin = await Admin.findOne({ email })
        if (admin) {
            return res.status(401).json({ msg: "Already Exists", status: false })
        }

        const otp = Math.random(100000, 999999) * 1000000


        const formattedOtp = Math.ceil(otp)
        console.log("otp for signup", formattedOtp)


        let mailOptions = {
            from: 'otpmompharmacy@gmail.com',
            to: email,
            subject: "Signup otp for mom pharmacy landing access",
            text: `Hey there here is your otp ${formattedOtp} have a great day`
        }

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                return res.status(500).send({ msg: "Error in nodemailer", status: false, err })
            } else {
                req.session.otp = formattedOtp
                console.log("Email is sent", info.response)
                return res.status(200).send({ msg: "Email is sent sucessfully", status: true })
            }
        })

        // req.session.otp = formattedOtp
        //         // console.log("Email is sent", info.response)
        //         return res.status(200).send({ msg: "Email is sent sucessfully", status: true })



    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error })
    }
}

// otp verfication for registration 
const registerOtpVerified = async (req, res) => {
    try {
        const { name, email, otp } = req.body
        const generatedOtp = req.session.otp
        console.log(generatedOtp)

        if (Number(otp) === Number(generatedOtp)) {
            let newAdmin = new Admin({
                email, name
            })

            newAdmin.save()
            req.session.otp = null
            return res.status(200).json({ msg: "Admin sucessfully created", status: true })

        } else {
            return res.status(401).json({ msg: "Invalid otp", status: false })
        }
    } catch (err) {
        res.status(500).json({ msg: "Internal server error", err })
    }
}


//login user
async function sendOtpViaEmail(req, res) {
    try {
        const { email } = req.body
        let isAdmin = await Admin.findOne({ email })
        if (isAdmin) {
            const otp = Math.random(1000000, 999999) * 1000000
            const formattedOtp = Math.ceil(otp)
            console.log(formattedOtp)
            req.session.otp = formattedOtp
            const mailOptions = {
                from: 'otpmompharmacy@gmail.com',
                to: email,
                subject: "Signin otp for mom pharmacy landing access",
                text: `Hey there here is your otp ${formattedOtp} have a great day`
            }
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    return res.status(500).send({ msg: "Error in nodemailer", status: false, err })
                } else {
                    req.session.otp = formattedOtp
                    console.log("Email is sent", info.response)
                    return res.status(200).send({ msg: "otp sent successfully", status: true })
                }

            })

        } else {
            res.status(404).json({ msg: "Admin not found", status: false })
        }
    } catch (e) {
        res.status(500).json({ msg: "Internal server error", e })
    }
}

//otp verfication for login
async function loginViaEmail(req, res) {
    try {
        const { otp, email } = req.body
        const generatedOtp = req.session.otp
        if (Number(otp) === Number(generatedOtp)) {
            let admin = await Admin.findOne({ email })
            if (!admin) {
                return res.status(401).json({ msg: "Admin Not Exist", status: false })
            }

            jwt.sign({ name: admin.name, email: admin.email }, process.env.JWT_SECRET, function (err, token) {
                if (err) {
                    return res.status(500).json({ msg: "Internal server error", e })
                } else {
                    return res.status(200).json({ msg: "generated token", token, status: true })
                }
            })
        } else {
            return res.status(401).json({ msg: "Invalid otp", status: false })
        }


    } catch (e) {
        res.status(500).json({ msg: "Internal server error", e })
    }
}

module.exports = { createUser, registerOtpVerified, sendOtpViaEmail, loginViaEmail }