
const User = require("../models/user.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

// Create a new user
exports.createUser = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body)
    res.status(201).json({
        status: "success",
        data: user,
    })
})

// Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        status: "success",
        data: users,
    })
})

// Get a single user
exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new AppError("User not found", 404))
    }
    res.status(200).json({
        status: "success",
        data: user,
    })
})

// Update a user
exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    if (!user) {
        return next(new AppError("User not found", 404))
    }
    res.status(200).json({
        status: "success",
        data: user,
    })
})

// Delete a user
exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
        return next(new AppError("User not found", 404))
    }
    res.status(204).json({
        status: "success",
        data: null,
    })
})
