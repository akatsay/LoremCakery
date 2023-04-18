require("dotenv").config()
const { Router } = require("express")
const { check, validationResult } = require("express-validator")
const Contact = require("../models/Contact")
const router = Router()

const nodemailer = require("nodemailer")

// /api/contact

router.post(
    '/',
    [
        check("firstName", "Wrong name")
            .matches(/^[A-Za-z\s]*$/).withMessage("Name must only contain latin letters")
            .not().isEmpty().withMessage("Don't forget your name"),
        check("mobile", "Wrong mobile phone number")
            .not().isEmpty().withMessage("Don't forget your phone number")
            .isMobilePhone("en-US").withMessage("Must be valid US number"),
        check("email", "Wrong email")
            .not().isEmpty().withMessage("Don't forget your email")
            .isEmail().withMessage("invalid Email"),
        check("message", "No message provided")
            .not().isEmpty().withMessage("Don't forget about message")
    ],
    async (req, res) => {
    try {
        
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()[0],
                message: `Incorrect form data ${errors.array()[0].msg}`
            })
        }

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