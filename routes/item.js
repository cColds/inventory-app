const express = require("express");
const ItemModel = require("../models/item");
const CategoryModel = require("../models/category");

const router = express.Router();

router.get("/create-item", async (req, res) => {
    const categories = await CategoryModel.find();
    res.render("item-form", { title: "Create Item", categories });
});

router.post("/create-item", async (req, res) => {
    const {
        "item-name": name,
        "item-description": description,
        "item-category": category,
    } = req.body;
    const price = Number(req.body["item-price"]);
    const stock = parseInt(req.body["item-stock"], 10);

    const item = new ItemModel({ name, description, category, price, stock });

    item.save();
    res.redirect("/");
});

module.exports = router;
