const { Router } = require("express")
const { check, validationResult } = require("express-validator")
const GalleryItem = require("../models/Gallery")
const auth = require("../middlewares/auth.middleware")
const router = Router()
const {cloudinary} = require("../utils/cloudinary")


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
    [
        check("title", "No title provided")
            .not().isEmpty(),
        check("description", "No description provided")
            .not().isEmpty(),
        check("price", "Wrong price")
            .isNumeric()
            .not().isEmpty()
    ],
    auth,
    async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()[0],
                message: `Incorrect form data ${errors.array()[0].msg}`
            })
        }

        const {imageAsString, ...data} = req.body

        if (imageAsString) {

            const uploadedResponse = await cloudinary.uploader.
            upload(imageAsString, {
                upload_preset: "LoremGallery"
            })

            const cloudinaryData = {public_id: uploadedResponse.public_id, url: uploadedResponse.url}
            const dataToSave = ({...cloudinaryData, ...data})
            const newGalleryItem = new GalleryItem (dataToSave)
            await newGalleryItem.save()
            res.status(201).json({message: "Item saved"})

        } else {

            const newGalleryItem = new GalleryItem (data)
            await newGalleryItem.save()
            res.status(201).json({message: "Item saved"})

        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

router.put(
    '/',
    auth,
    [
        check("title", "No title provided")
            .not().isEmpty(),
        check("description", "No description provided")
            .not().isEmpty(),
        check("price", "Wrong price")
            .isNumeric()
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

        const {id, imageAsString, ...data} = req.body

        const currentGalleryItem = await GalleryItem.findById(id)
        
        if (!currentGalleryItem) {
            return res.status(404).json({message: "Item doesn't exist"})
        }

        if(currentGalleryItem.public_id) {
            await cloudinary.uploader.destroy(currentGalleryItem.public_id)
        }

        // shitty solution to avoid error when updating item without uploading new image

        const oldImgUrl = currentGalleryItem.url // pseudo cacheing :)

        if(oldImgUrl !== imageAsString) {

            const updatedResponse = await cloudinary.uploader.
            upload(imageAsString, {
                upload_preset: "LoremGallery"
            })
    
            const cloudinaryData = {public_id: updatedResponse.public_id, url: updatedResponse.url}
            const dataToUpdate = ({...cloudinaryData, ...data})

            await currentGalleryItem.updateOne(dataToUpdate);
    
            res.json({message: "Item updated"}) 

        } else {
            await currentGalleryItem.updateOne(data);
            res.json({message: "Item updated"}) 
        }

        //-----------------------------------------

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

        if (currentGalleryItem.public_id) {
            await cloudinary.uploader.destroy(currentGalleryItem.public_id)
        }
        
        await currentGalleryItem.deleteOne()
        res.json({message: "Item deleted"})

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: " something went wrong on the server... " })
    }
})

module.exports = router