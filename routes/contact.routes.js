const { Router } = require("express")
const Contact = require("../models/Contact")
const router = Router()
require("dotenv").config()

const nodemailer = require("nodemailer")

// /api/contact

router.post(
    '/',
    async (req, res) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL1,
                pass: process.env.PASSWORD1
            }
        })

        const mailOptions = {
            from: req.body.email,
            to: process.env.EMAIL1,
            subject: "Lorem Cakery Contact Request",
            text: `${req.body.firstName} Requests contact to either:
             ${req.body.mobile} or ${req.body.email}, the message is: "${req.body.message}"`
        }

        await transporter.sendMail(mailOptions)

        const newContact = new Contact({
            firstName: req.body.firstName,
            mobile: req.body.mobile,
            email: req.body.email,
            message: req.body.message,
            date: new Date
           })

       await newContact.save()

       res.status(201).json({message: "Email sent and contact saved"})

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

module.exports = router