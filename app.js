require("dotenv").config({ path: "./config.env" });

const path = require("path");

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const CORS = require("cors");

const storeRouter = require("./routes/store-routes");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(CORS());

app.use("/api/v1/stores", storeRouter);

const DB = process.env.MONGO_URI.replace("<PASSWORD>", process.env.MONGO_PASSWORD);
const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
       const connection = await mongoose.connect(DB);
       console.log(`MongoDB connected => ${connection.connection.host}`)
       app.listen(5000, () => console.log(`Server is up on port ${PORT}...`));
    } catch (error) {
        console.error(`Oh no...something went wrong ${error}...`);
        process.exit(1);
    };
};

start();