const { validationResult } = require("express-validator");
const CategoryModel = require("../models/category");

async function handleItemValidation(req, res, next) {
    const result = validationResult(req);
    const { fileValidationError } = req;

    if (!result.isEmpty() || fileValidationError) {
        // TODO: fix title should be update item if get error
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
            fileValidationError,
        });
        return;
    }

    next();
}

module.exports = handleItemValidation;
