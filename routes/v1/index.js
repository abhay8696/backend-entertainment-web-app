const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const bookmarkRoute = require("./bookmark.route");

const router = express.Router();

router.use("/user", userRoute);

router.use("/auth", authRoute);

router.use("/bookmark", bookmarkRoute);

module.exports = router;
