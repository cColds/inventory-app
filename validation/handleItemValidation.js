const { validationResult } = require("express-validator");
const CategoryModel = require("../models/category");

function handleItemValidation(title) {
    return async (req, res, next) => {
        const result = validationResult(req);
        const { fileValidationError } = req;

        if (!result.isEmpty() || fileValidationError) {
            const categories = await CategoryModel.find({}, "name");
            const { errors } = result;

            const passwordError = result.errors.find(
                (err) => err.path === "password"
            );
            const nameError = errors.find((err) => err.path === "item-name");
            const descriptionError = errors.find(
                (err) => err.path === "item-description"
            );
            const priceError = errors.find((err) => err.path === "item-price");
            const stockError = errors.find((err) => err.path === "item-stock");
            const categoryError = errors.find(
                (err) => err.path === "item-category"
            );

            const hasAdminPassword = req.body.password !== undefined;

            const isInvalidAdminPassword =
                hasAdminPassword &&
                req.body.password !== undefined &&
                passwordError?.msg !== undefined;

            res.render("item-form", {
                title,
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
                passwordError: isInvalidAdminPassword
                    ? passwordError.msg
                    : false,
                hasAdminPassword,
            });
            return;
        }

        next();
    };
}

module.exports = handleItemValidation;
