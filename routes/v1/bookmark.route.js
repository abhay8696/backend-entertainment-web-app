const express = require("express");
const auth = require("../../middlewares/auth");

const {
    createBookmark,
    getAllBookmarks,
    deleteBookmark,
    findBookMark,
} = require("../../controllers/bookmark.controller");

const router = express.Router();

router.get("/all", auth, getAllBookmarks);
router.get("/:tmdb_id", auth, findBookMark);
router.post("/new", auth, createBookmark);
router.delete("/:id", auth, deleteBookmark);

module.exports = router;
