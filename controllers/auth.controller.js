const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");

const register = catchAsync(async (req, res) => {
    const createUser = await userService.createUser(req.body);

    const token = await tokenService.generateAuthTokens(createUser);

    res.status(httpStatus.CREATED).send({ user: createUser, tokens: token });
});

const login = catchAsync(async (req, res) => {
    const findUser = await authService.loginUserWithEmailAndPassword(
        req.body.email,
        req.body.password
    );

    const token = await tokenService.generateAuthTokens(findUser);

    res.send({ user: findUser, tokens: token, httpStatus });
});

module.exports = {
    register,
    login,
};
