const { body } = require("express-validator");
const CategoryModel = require("../models/category");
const isNumeric = require("../utils/isNumeric");

const nameValidator = body("item-name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Name must be 150 characters or less")
    .escape();

const descriptionValidator = body("item-description")
    .trim()
    .isLength({ max: 350 })
    .withMessage("Description must be 350 characters or less")
    .escape();

const priceValidator = body("item-price")
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
    .escape();

const stockValidator = body("item-stock")
    .trim()
    .notEmpty()
    .withMessage("Stock cannot be empty")
    .isNumeric()
    .withMessage("Stock must be an integer")
    .isInt({ min: 1 })
    .withMessage("Stock must be an integer of 1 or greater")
    .isInt({ max: 1_000_000 })
    .withMessage("Stock must be an integer of 1,000,000 or fewer")
    .escape();

const categoryValidator = body("item-category")
    .custom(async (value) => {
        try {
            const categories = await CategoryModel.find({}, "name");
            if (!categories.length) {
                throw new Error("No categories available");
            }

            const categoryExists = categories.some(
                (category) => category._id.toString() === value
            );

            if (!categoryExists) throw new Error("Category doesn't exist");

            return true;
        } catch (e) {
            console.error("something went wrong:", e);
            return false;
        }
    })
    .escape();

module.exports = {
    nameValidator,
    descriptionValidator,
    priceValidator,
    stockValidator,
    categoryValidator,
};
