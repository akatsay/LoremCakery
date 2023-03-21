const {Schema, model} = require("mongoose")

const schema = new Schema({
    imageAsString: {type: String, required: true, default: ""},
    title: {type: String, required: true, default: ""},
    description: {type: String, required: true, default: ""},
    price: {type: String, required: true, default: ""},
    date: {type: Date, default: Date.now},
})

module.exports = model("GalleryItem", schema)