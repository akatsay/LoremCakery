const { Router } = require("express")
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
    async (req, res) => {
    try {

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

module.exports = router