const express = require("express")
const morgan = require("morgan")
const AppError = require("./utils/appError")
const app = express()
const cors = require("cors")
const i18n = require("i18n")
app.use(express.json())
//swagger

// Middleware
app.use(morgan("dev"))
app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE")
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Access-Control-Allow-Credentials", true)
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
})
app.use("/uploads", express.static("uploads"))

i18n.configure({
    locales: ["ar", "en"],
    directory: __dirname + "/locales", // if you don't specify this it will throw an error
    queryParameter: "lang",
    defaultLocales: ["en"], // if you don't specify this it will throw an error
    cookie: "lang",
})

app.use(i18n.init)

// Routes
// app.use("/api/v1/auth", authRouter)
app.use((req, res, next) => {
    const userLang = req.query.lang || req.headers["accept-language"] || "en"
    i18n.setLocale(userLang)
    next()
})

// Home Route

app.get("/", (req, res) => {
    res.send(i18n.__("welcome"))
})

app.use((err, req, res, next) => {
    // Check if the error is an instance of your AppError class
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }
    // Handle other errors
    res.status(500).json({
        status: "error",
        message: err.message,
        statusCode: err.code,
    })
})

module.exports = app
