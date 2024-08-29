const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const config = require("../config/config");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: {
                validator: (email) => validator.isEmail(email),
                message: (props) => `${props.value} is not a valid email.`,
            },
            lowercase: true,
        },
        password: {
            type: String,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error(
                        "Password must contain at least one letter and one number"
                    );
                }
            },
            required: true,
            minLength: 8,
            trim: true,
            // validate: [passwordValidator, 'Password must be at least 8 characters long and contain at least one letter and one number.']
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
        },
        // timestamps: true,
    }
    // Create createdAt and updatedAt fields automatically
    // {
    //   timestamps: true,
    // }
);

/**
 * Pre-save hook to hash the password before saving to the database
 */

UserSchema.pre("save", async function (next) {
    const user = this;

    if (this.isModified("password")) {
        // Only hash the password if it has been modified (or is new)
        try {
            // Generate a salt
            const salt = await bcrypt.genSalt(10);

            // Hash the password with the salt
            const hashedPassword = await bcrypt.hash(user.password, salt);

            // Replace the plain password with the hashed password
            user.password = hashedPassword;

            next();
        } catch (error) {
            return next(error);
        }
    }
});

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement the isEmailTaken() static method
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
UserSchema.statics.isEmailTaken = async function (email) {
    let result = await this.findOne({ email: email });
    return !!result;
};

/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password) {
    // const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) {
                reject(err);
            }
            resolve(isMatch);
        });
    });
};

/**
 * Check if user have set an address other than the default address
 * - should return true if user has set an address other than default address
 * - should return false if user's address is the default address
 *
 * @returns {Promise<boolean>}
 */
UserSchema.methods.hasSetNonDefaultAddress = async function () {
    const user = this;
    return user.address !== config.default_address;
};
/*
 * Create a Mongoose model out of userSchema and export the model as "User"
 * Note: The model should be accessible in a different module when imported like below
 * const User = require("<user.model file path>").User;
 */
/**
 * @typedef User
 */

const User = mongoose.model("User", UserSchema);

module.exports.User = User;
module.exports.userSchema = UserSchema;

// module.exports = User;
