const {Schema, model} = require("mongoose")

const schema = new Schema({
    rating: {type: Number, required: true},
    name: {type: String, default: ""},
    comment: {type: String, required: true, default: ""},
    date: {type: Date, default: Date.now},
})

module.exports = model("Review", schema)