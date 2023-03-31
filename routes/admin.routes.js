const { Router } = require("express")
const router = Router()
const jwt = require("jsonwebtoken")
require("dotenv").config()

// /api/admin

router.post(
    '/login',
    async (req, res) => {
    try {

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