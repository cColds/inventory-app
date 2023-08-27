const ItemModel = require("../models/item");
const CategoryModel = require("../models/category");

async function homePage(req, res, next) {
    const items = await ItemModel.find().populate([
        { path: "category", strictPopulate: false },
    ]);

    const categories = await CategoryModel.find();
    const [{ totalValue }] = await ItemModel.aggregate([
        { $group: { _id: null, totalValue: { $sum: "$price" } } },
    ]);

    const totalValueInUSD = totalValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    res.render("index", {
        title: "Inventory App",
        items,
        categories,
        totalValue: totalValueInUSD,
    });
}

async function itemPage(req, res, next) {
    const item = await ItemModel.findById(req.params.itemId).populate([
        { path: "category", strictPopulate: false },
    ]);

    res.render("item", { title: "Item", item });
}

module.exports = { homePage, itemPage };
