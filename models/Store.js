const { Schema, model } = require("mongoose");

const geocoder = require("./../utilities/geocoder");

const storeSchema = new Schema({
    storeID: {
        type: String,
        required: [true, "Please add a storeID!"],
        unique: true,
        trim: true,
        maxlength: [10, "Store ID must be less than 10 characters!"],
    },
    address: {
        type: String,
        required: [true, "Please add an address!"],
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number], 
            index: "2dsphere",
        },
        formattedAddress: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

storeSchema.pre("save", async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
    };
    this.address = undefined;
    next();
});

const Store = model("Store", storeSchema);

module.exports = Store;