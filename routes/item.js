const express = require("express");
const CategoryModel = require("../models/category");

const router = express.Router();

router.get("/create-item", async (req, res) => {
    const categories = await CategoryModel.find();

    res.render("item-form", { title: "Create Item", categories });
});

module.exports = router;
