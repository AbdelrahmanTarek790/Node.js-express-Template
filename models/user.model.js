
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "engineer"],
            default: "engineer",
        },
        image: {
            type: String,
            default: "default.jpg",
        },
    },
    {
        timestamps: true,
    }
)

// Hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Check if the password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Create a model based on the schema
const User = mongoose.model("User", userSchema)

// Export the model
module.exports = User
