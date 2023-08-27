const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

itemSchema.virtual("url").get(function () {
    return `/item/${this._id}`;
});

itemSchema.virtual("priceFormatted").get(function () {
    return this.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
});

module.exports = model("item", itemSchema);
