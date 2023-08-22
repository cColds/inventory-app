const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

itemSchema.virtual("url").get(function () {
    return `/items/${this._id}`;
});

module.exports = model("item", itemSchema);
