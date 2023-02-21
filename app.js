const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const path = require("path")
const fs = require('fs')
const https = require('https')

// const privateKey  = fs.readFileSync("").toString()
// const certificate = fs.readFileSync("").toString()

// const credentials = {key: privateKey, cert: certificate}

const app = express()

app.use(express.json({extended: true}))

app.use("/api/contact", require("./routes/contact.routes"))
app.use("/api/admin", require("./routes/admin.routes"))

app.use(function(request, response, next) {

    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
})

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.NODE_ENV == 'production' ? process.env.PROD_PORT_HTTPS : process.env.DEV_PORT

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        // await https.createServer(credentials, app).listen(PORT)
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
  }
  
  start()