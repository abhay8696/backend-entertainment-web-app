const { Bookmark } = require("../models/bookmark.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const createBookmark = async (newBookmark) => {
    try {
        await Bookmark.create(newBookmark);
        return await getAllBookmarks();
    } catch (error) {
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Failed to create bookmark",
            true,
            error.stack
        );
    }
};

const findBookMark = async (tmdb_id) => {
    try {
        const bookmark = await Bookmark.findOne({ tmdb_id: tmdb_id });
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

const getAllBookmarks = async () => {
    try {
        const allBookmarks = await Bookmark.find();
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

const deleteBookmark = async (tmdb_id) => {
    try {
        const result = await Bookmark.deleteOne({ tmdb_id: tmdb_id });
        if (result.deletedCount > 0) {
            let remainingBookmarks = await Bookmark.find();

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
    getAllBookmarks,
    deleteBookmark,
};
