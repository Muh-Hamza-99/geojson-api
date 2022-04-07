const express = require("express");
const router = express.Router();

const {
    getStores,
    createStore,
} = require("./../controllers/store-controllers");

router
    .route("/")
    .get(getStores)
    .post(createStore);

module.exports = router;