const { required } = require("joi");
const mongoose = require("mongoose");

const BookmarkSchema = mongoose.Schema({
    tmdb_id: {
        type: Number,
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Allows an arbitrary object
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to the User collection
        required: true,
    },
});

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

module.exports.Bookmark = Bookmark;
// module.exports.BookmarkSchema = BookmarkSchema;
