const {Schema, model} = require("mongoose")

const schema = new Schema({
    public_id: {type: String, default: ""},
    url: {type: String, default: "https://res.cloudinary.com/duzeiscto/image/upload/v1680815536/LoremGallery/%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D0%B0%D1%8F-%D0%BA%D1%80%D1%8B%D1%81%D0%B0-%D0%B5%D1%81%D1%82-%D1%82%D0%BE%D1%80%D1%82-%D1%81%D0%BB%D0%B0%D0%B4%D0%BA%D0%B0%D1%8F-%D0%B6%D0%B8%D0%B7%D0%BD%D1%8C-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D0%B8%D1%8F-%D0%BF%D1%80%D0%B0%D0%B7%D0%B4%D0%BD%D0%B8%D0%BA%D0%B0-%D0%B5%D0%B4%D0%B0-%D0%B4%D0%BB%D1%8F-170988802_f6ra10.jpg"},
    title: {type: String, required: true, default: ""},
    description: {type: String, required: true, default: ""},
    price: {type: String, required: true, default: ""},
    date: {type: Date, default: Date.now},
})

module.exports = model("GalleryItem", schema)