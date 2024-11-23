const express = require("express");

const {
    createBookmark,
    getAllBookmarks,
    deleteBookmark,
} = require("../../controllers/bookmark.controller");

const router = express.Router();

router.get("/all", getAllBookmarks);
router.post("/new", createBookmark);
router.delete("/:id", deleteBookmark);

module.exports = router;
