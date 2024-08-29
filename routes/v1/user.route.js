const express = require("express");
const validate = require("../../middlewares/validate");
const {
    createUser,
    getUserByEmail,
} = require("../../controllers/user.controller");

const router = express.Router();

router.post("/new", createUser);
router.get("/email", getUserByEmail);

module.exports = router;
