const { Router } = require("express")
const { check, validationResult } = require("express-validator")
const Review = require("../models/Review")
const router = Router()


// api/review

router.get(
    '/',
    async (req, res) => {
    try {

        const reviews = await Review.find()

        res.status(200).json(reviews.reverse())

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

router.post(
    '/',
    [
        check("rating", "Wrong rating")
            .isNumeric()
            .not().isEmpty(),
        check("name", "Wrong name")
            .matches(/^[A-Za-z\s]*$/).withMessage("Name must only contain latin letters")
            .not().isEmpty().withMessage("Don't forget your name"),
        check("comment", "No comment provided")
            .not().isEmpty()
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

        const currentDate = new Date

        const year = currentDate.getFullYear()
        const month = currentDate.toLocaleString('EN', { month: 'long' })
        const day = currentDate.getDay()

        const dateString = `${month} ${day} ${year}`

        const newReview = new Review({
            rating: req.body.rating,
            name: req.body.name,
            comment: req.body.comment,
            date: dateString
           })

       await newReview.save()

       res.status(201).json({message: "Review saved"})

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

// router.delete(
//     '/',
//     async (req, res) => {
//     try {

//         const reviews = await Review.deleteMany()

//         res.status(200).json({message: "all reviews deleted :)"})

//     } catch (e) {
//         console.log(e)
//         res.status(500).json({ message: " something went wrong on the server... " })
//     }
// })

module.exports = router