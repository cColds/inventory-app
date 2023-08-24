const ItemModel = require("../models/item");
const CategoryModel = require("../models/category");

async function home(req, res, next) {
    const items = await ItemModel.find();
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

module.exports = { home };
