const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/") // Specify the destination folder for uploaded images
//     },
//     filename: (req, file, cb) => {
//         const domainName = "http://195.35.1.72:8080/uploads/"
//         const filename = Date.now() + "-" + file.originalname
//         cb(null, filename) // Define the file naming convention
//         req.image = domainName + filename // Save the file path to the request body
//     },
// })

const upload = multer({ storage })

const singleUpload = upload.single("file")
exports.uploadProductImage = (req, res, next) => {
    singleUpload(req, res, (err) => {
        if (err) {
            return next(new AppError("Error uploading product image", 400))
        }
        next()
    })
}
