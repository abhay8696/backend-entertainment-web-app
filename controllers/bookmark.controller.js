const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const { bookmarkService } = require("../services");

const createBookmark = catchAsync(async (req, res) => {
    const create = await bookmarkService.createBookmark(req.user._id, req.body);

    res.status(httpStatus.CREATED).send(create);
});

const findBookMark = catchAsync(async (req, res) => {
    const bookmark = await bookmarkService.findBookMark(
        req.user._id,
        req.params.tmdb_id
    );

    res.send(bookmark);
});

const getAllUserBookmarks = catchAsync(async (req, res) => {
    const all = await bookmarkService.getAllUserBookmarks(req.user._id);

    res.send(all);
});

const deleteBookmark = catchAsync(async (req, res) => {
    const del = await bookmarkService.deleteBookmark(
        req.user._id,
        req.params.id
    );

    res.send(del);
});

module.exports = {
    createBookmark,
    findBookMark,
    getAllUserBookmarks,
    deleteBookmark,
};
