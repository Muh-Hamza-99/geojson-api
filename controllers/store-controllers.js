const Store = require("./../models/Store");

const catchAsync = require("./../utilities/catch-async");

const getStores = catchAsync(async (req, res, next) => {
    const stores = await Store.find({});
    res.status(200).json({ status: "success", count: stores.length, data: { stores } });
});

const createStore = catchAsync(async (req, res, next) => {
    const { storeID, address } = req.body;
    const store = await Store.create({ storeID, address });
    res.status(201).json({ status: "success", data: { store } });
});

module.exports = {
    getStores,
    createStore,
};