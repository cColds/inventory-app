const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: String,
});

categorySchema.virtual("url").get(function () {
    return `/categories/${this._id}`;
});

module.exports = model("category", categorySchema);
