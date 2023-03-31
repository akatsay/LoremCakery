const { Router } = require("express")
const GalleryItem = require("../models/Gallery")
const auth = require("../middlewares/auth.middleware")
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
    auth,
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

router.put(
    '/',
    auth,
    async (req, res) => {
    try {

        const {id, ...data} = req.body

        const currentGalleryItem = await GalleryItem.findById(id)
        
        if (!currentGalleryItem) {
            return res.status(404).json({message: "Item doesn't exist"})
        }

        await currentGalleryItem.updateOne(data);

        res.json({message: "Item updated"})
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

router.delete(
    '/',
    auth,
    async (req, res) => {
    try {

        const {id} = req.body

        const currentGalleryItem = await GalleryItem.findById(id)
        
        if (!currentGalleryItem) {
            return res.status(404).json({message: "Item doesn't exist"})
        }

        await currentGalleryItem.deleteOne()
        res.json({message: "Item deleted"})

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

module.exports = router