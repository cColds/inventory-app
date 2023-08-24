const { body, validationResult } = require("express-validator");
const CategoryModel = require("../models/category");
const ItemModel = require("../models/item");
const isNumeric = require("../utils/isNumeric");

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
    body("item-name")
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ max: 150 })
        .withMessage("Name must be 150 characters or less")
        .escape(),
    body("item-description")
        .trim()
        .isLength({ max: 350 })
        .withMessage("Description must be 350 characters or less")
        .escape(),
    body("item-price")
        .trim()
        .notEmpty()
        .withMessage("Price cannot be empty")
        .custom((price) => {
            if (isNumeric(price) || Number(price) === Infinity) {
                throw new Error("Price is invalid");
            }

            if (Number(price) < 0.01) {
                throw new Error("Price must be $0.01 or greater");
            }

            return true;
        })
        .escape(),
    body("item-stock")
        .trim()
        .notEmpty()
        .withMessage("Stock cannot be empty")
        .isNumeric()
        .withMessage("Stock must be an integer")
        .isInt({ min: 1 })
        .withMessage("Stock must be an integer of 1 or greater")
        .isInt({ max: 1_000_000 })
        .withMessage("Stock must be an integer of 1,000,000 or fewer")
        .escape(),
    body("item-category")
        .custom(async (value) => {
            const categories = await CategoryModel.find({}, "name");
            if (!categories.length) {
                throw new Error("No categories available");
            }

            const categoryExists = categories.some(
                (category) => category.name === value
            );

            if (!categoryExists) throw new Error("Category doesn't exist");

            return true;
        })
        .escape(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const categories = await CategoryModel.find({}, "name");
            const { errors } = result;
            const nameError = errors.find((err) => err.path === "item-name");
            const descriptionError = errors.find(
                (err) => err.path === "item-description"
            );
            const priceError = errors.find((err) => err.path === "item-price");
            const stockError = errors.find((err) => err.path === "item-stock");
            const categoryError = errors.find(
                (err) => err.path === "item-category"
            );

            res.render("item-form", {
                title: "Create Item",
                name: req.body["item-name"],
                description: req.body["item-description"],
                price: req.body["item-price"],
                stock: req.body["item-stock"],
                categories,
                selected: req.body["item-category"],
                nameError,
                descriptionError,
                priceError,
                stockError,
                categoryError,
            });
            return;
        }

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

        item.save();
        res.redirect("/");
    },
];

module.exports = { createItemGET, createItemPOST };
