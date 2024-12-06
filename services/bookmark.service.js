const { Bookmark } = require("../models/bookmark.model");
const { User } = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const createBookmark = async (userId, newBookmark) => {
    try {
        const bookmark = await Bookmark.create({
            ...newBookmark,
            userId,
        });

        // update the user's bookmarks array
        await User.findByIdAndUpdate(userId, {
            $push: { bookmarks: bookmark._id },
        });

        //fetch all bookmarks by user
        const userBookmarks = await Bookmark.find({ userId });

        return userBookmarks;
    } catch (error) {
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Failed to create bookmark",
            true,
            error.stack
        );
    }
};

const findBookMark = async (userId, tmdb_id) => {
    try {
        const bookmark = await Bookmark.findOne({ tmdb_id, userId });
        if (!bookmark) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                `Bookmark with TMDB ID ${tmdb_id} not found`
            );
        }
        return bookmark;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Failed to fetch bookmark",
            true,
            error.stack
        );
    }
};

const getAllUserBookmarks = async (userId) => {
    try {
        const allBookmarks = await Bookmark.find({ userId });
        return allBookmarks;
    } catch (error) {
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Failed to fetch all bookmarks",
            true,
            error.stack
        );
    }
};

const deleteBookmark = async (userId, tmdb_id) => {
    try {
        const result = await Bookmark.deleteOne({ tmdb_id, userId });
        if (result.deletedCount > 0) {
            let remainingBookmarks = await Bookmark.find({ userId });

            return remainingBookmarks;
        } else {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                `Bookmark with TMDB ID ${tmdb_id} not found`
            );
        }
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Failed to delete bookmark",
            true,
            error.stack
        );
    }
};

module.exports = {
    createBookmark,
    findBookMark,
    getAllUserBookmarks,
    deleteBookmark,
};
