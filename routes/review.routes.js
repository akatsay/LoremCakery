const { Router } = require("express")
const Review = require("../models/Review")
const router = Router()


// api/review

router.get(
    '/review',
    async (req, res) => {
    try {

        const reviews = await Review.find()

        res.status(200).json(reviews)

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

router.post(
    '/review',
    async (req, res) => {
    try {

        const newReview = new Review({
            rating: req.body.rating,
            name: req.body.name,
            comment: req.body.comment,
            date: new Date
           })

       await newReview.save()

       res.status(201).json({message: "Review saved"})

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

module.exports = router