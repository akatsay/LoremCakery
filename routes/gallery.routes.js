const { Router } = require("express")
const GalleryItem = require("../models/Gallery")
const router = Router()


// /api/gallery

router.get(
    '/',
    async (req, res) => {
    try {

        const galleryItems = await GalleryItem.find()

        res.status(200).json(galleryItems)

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

router.post(
    '/',
    async (req, res) => {
    try {

        const data = req.body

        const newGalleryItem = new GalleryItem (data)

        await newGalleryItem.save()

        res.status(201).json({message: "Item saved"})

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

module.exports = router