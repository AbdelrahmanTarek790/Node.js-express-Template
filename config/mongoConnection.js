const mongoose = require("mongoose")

// Connect to MongoDB
mongoose
    .connect(process.env.DB_URI, {
        dbName: `Project_CodePeak`,
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err)
    })

// Export the connection
module.exports = mongoose.connection
