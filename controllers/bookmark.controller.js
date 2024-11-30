const catchAsync = require("../utils/catchAsync");
const { bookmarkService } = require("../services");

const createBookmark = catchAsync(async (req, res) => {
    //check if bookmark already exist
    //if true delete bookmark
    //else create new
    const create = await bookmarkService.createBookmark(req.body);

    res.send(create);
});

const findBookMark = catchAsync(async (req, res) => {
    const bookmark = await bookmarkService.findBookMark(req.params.tmdb_id);

    res.send(bookmark);
});

const getAllBookmarks = catchAsync(async (req, res) => {
    const all = await bookmarkService.getAllBookmarks();

    res.send(all);
});

const deleteBookmark = catchAsync(async (req, res) => {
    const del = await bookmarkService.deleteBookmark(req.params.id);

    res.send(del);
});

module.exports = {
    createBookmark,
    findBookMark,
    getAllBookmarks,
    deleteBookmark,
};
