require("dotenv").config()
const { Router } = require("express")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const router = Router()


// /api/admin

router.post(
    '/',
    [
        check("login", "Wrong login")
            .not().isEmpty().withMessage("Don't forget your login"),
        check("password", "Wrong password")
            .not().isEmpty().withMessage("Don't forget your password")
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Incorrect email or password"
            })
        }

        const {login, password} = req.body

        if (login != process.env.LOGIN || password != process.env.PASSWORD2) {
            return res.status(401).json({message: "incorrect login or password"}) 
        } 

        const token = jwt.sign(
            {login},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.json({ token, message: `logged in as admin` })
    

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

module.exports = router