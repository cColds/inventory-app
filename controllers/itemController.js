const CategoryModel = require("../models/category");
const ItemModel = require("../models/item");
const handleItemValidation = require("../validation/handleItemValidation");
const {
    nameValidator,
    descriptionValidator,
    priceValidator,
    stockValidator,
    categoryValidator,
} = require("../validation/itemValidator");

async function createItemGET(req, res) {
    const categories = await CategoryModel.find({}, "name");

    res.render("item-form", {
        title: "Create Item",
        name: "",
        description: "",
        price: "",
        stock: "",
        categories,
        selected: "",
        nameError: "",
        descriptionError: "",
        priceError: "",
        stockError: "",
        categoryError: "",
    });
}

const createItemPOST = [
    nameValidator,
    descriptionValidator,
    priceValidator,
    stockValidator,
    categoryValidator,
    handleItemValidation,
    async (req, res) => {
        const {
            "item-name": name,
            "item-description": description,
            "item-category": category,
        } = req.body;
        const price = Number(req.body["item-price"]);
        const stock = parseInt(req.body["item-stock"], 10);

        const item = new ItemModel({
            name,
            description,
            category,
            price,
            stock,
        });

        await item.save();
        res.redirect(item.url);
    },
];

async function updateItemGET(req, res) {
    const item = await ItemModel.findById(req.params.itemId);
    const categories = await CategoryModel.find();

    res.render("item-form", {
        title: "Update Item",
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        categories,
        selected: item.category,
        nameError: "",
        descriptionError: "",
        priceError: "",
        stockError: "",
        categoryError: "",
    });
}

const updateItemPOST = [
    nameValidator,
    descriptionValidator,
    priceValidator,
    stockValidator,
    categoryValidator,
    handleItemValidation,
    async (req, res) => {
        const {
            "item-name": name,
            "item-description": description,
            "item-category": category,
        } = req.body;
        const price = Number(req.body["item-price"]);
        const stock = parseInt(req.body["item-stock"], 10);

        const item = new ItemModel({
            _id: req.params.itemId,
            name,
            description,
            category,
            price,
            stock,
        });

        const updatedItem = await ItemModel.findByIdAndUpdate(
            req.params.itemId,
            item
        );

        res.redirect(updatedItem.url);
    },
];

async function deleteItemGET(req, res) {
    const item = await ItemModel.findById(req.params.itemId);

    res.render("delete-item", { title: "Delete Item", item });
}

async function deleteItemPOST(req, res) {
    const item = await ItemModel.findById(req.params.itemId);

    await item.deleteOne({ _id: req.params.itemId });

    res.redirect("/");
}

module.exports = {
    createItemGET,
    createItemPOST,
    updateItemGET,
    updateItemPOST,
    deleteItemGET,
    deleteItemPOST,
};
