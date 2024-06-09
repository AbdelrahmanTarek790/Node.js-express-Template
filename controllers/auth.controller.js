const User = require("../models/user.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const jwt = require("jsonwebtoken")

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (user, statusCode, res, req) => {
    const token = signToken(user._id)

    // Remove password from output
    user.password = undefined

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    })
}

// Register a new user
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body)
    
    createSendToken(newUser, 201, res)
})

// Login a user
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    // Check if email and password exist
    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400))
    }

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password")
    if (!user || !(await user.isPasswordCorrect(password))) {
        return next(new AppError("Incorrect email or password", 401))
    }

    // Create and send token
    createSendToken(user, 200, res)
})

