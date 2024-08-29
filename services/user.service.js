const { User } = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");

/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "users",
 *  "email": "user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
const createUser = async (newUser) => {
    const { name, email, password } = newUser;

    // check if email is unique
    const isEmailTaken = await User.isEmailTaken(email);

    if (isEmailTaken) {
        throw new ApiError(httpStatus.OK, "Email already taken");
    } else {
        try {
            const newPost = await User.create(newUser);
            return newPost;
        } catch (err) {
            // console.log("errrrrr", err)
            return err;
        }
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });

        return user;
    } catch (err) {
        // console.log("errrrrr", err)
        return err;
    }
};

module.exports = { createUser, getUserByEmail };
