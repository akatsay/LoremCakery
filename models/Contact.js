const {Schema, model} = require("mongoose")

const schema = new Schema({
    firstName: {type: String, required: true, default: ""},
    mobile: {type: String, required: true, default: ""},
    email: {type: String, required: true, default: ""},
    message: {type: String, required: true, default: ""},
    date: {type: Date, default: Date.now},
})

module.exports = model("Contact", schema)