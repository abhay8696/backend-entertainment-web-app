const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const { query } = require("express");

const createUser = catchAsync(async (req, res) => {
    const create = await userService.createUser(req.body);

    res.send(create);

    // throw new ApiError(httpStatus[404], "User not found");
});

const getUserByEmail = catchAsync(async (req, res) => {
    const user = await userService.getUserByEmail(req.body.email);

    res.send(user);

    // throw new ApiError(httpStatus[404], "User not found");
});

module.exports = {
    createUser,
    // getUser,
    getUserByEmail,
    // setAddress,
};
