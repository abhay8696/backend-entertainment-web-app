const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");

/**
 * Generate jwt token
 * - Payload must contain fields
 * --- "sub": `userId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration must be set to the value of `expires` parameter
 *
 * @param {ObjectId} userId - Mongo user id
 * @param {Number} expires - Token expiration time in seconds since unix epoch
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const paylodad = {
        sub: userId,
        type: type,
        iat: Math.floor(Date.now() / 1000),
        exp: expires,
    };

    // const options = { exp: expires };

    return jwt.sign(paylodad, secret);
};

/**
 * Generate auth token
 * - Generate jwt token
 * - Token type should be "ACCESS"
 * - Return token and expiry date in required format
 *
 * @param {User} user
 * @returns {Promise<Object>}
 *
 * Example response:
 * "access": {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 *          "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
const generateAuthTokens = async (user) => {
    // console.log(token);240
    const currentTimeInSec = Math.floor(new Date() / 1000); //Date return time in milliseconds, divide by 1000 to get in seconds
    const tokenValidityInSec = 4 * 60 * 60;
    const expirationTimeFromNow = currentTimeInSec + tokenValidityInSec;

    const token = generateToken(
        user._id,
        expirationTimeFromNow * 1000,
        tokenTypes.ACCESS,
        config.jwt.secret
    );

    return {
        access: {
            token,
            expires: new Date(expirationTimeFromNow * 1000),
        },
    };
};

module.exports = {
    generateToken,
    generateAuthTokens,
};
