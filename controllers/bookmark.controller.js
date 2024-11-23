const catchAsync = require("../utils/catchAsync");
const { bookmarkService } = require("../services");

const createBookmark = catchAsync(async (req, res) => {
    const create = await bookmarkService.createBookmark(req.body);

    res.send(create);
});

const getAllBookmarks = catchAsync(async (req, res) => {
    const all = await bookmarkService.getAllBookmarks();

    res.send(all);
});

const deleteBookmark = catchAsync(async (req, res) => {
    const del = await bookmarkService.deleteBookmark(req.params.id);

    res.send(del);
});

module.exports = { createBookmark, getAllBookmarks, deleteBookmark };
