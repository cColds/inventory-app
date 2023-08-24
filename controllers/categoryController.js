const { body, validationResult } = require("express-validator");
const CategoryModel = require("../models/category");

async function createCategoryGET(req, res) {
    res.render("category-form", {
        title: "Create Category",
        name: "",
        description: "",
        nameError: "",
        descriptionError: "",
    });
}

const createCategoryPOST = [
    body("category-name")
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ max: 50 })
        .withMessage("Name must be 50 characters or less")
        .escape(),
    body("category-description")
        .trim()
        .isLength({ max: 350 })
        .withMessage("Description must be 350 characters or less")
        .escape(),

    async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            const { errors } = result;

            const nameError = errors.find(
                (err) => err.path === "category-name"
            );
            const descriptionError = errors.find(
                (err) => err.path === "category-description"
            );

            res.render("category-form", {
                title: "Create Category",
                name: req.body["category-name"],
                description: req.body["category-description"],
                nameError,
                descriptionError,
            });

            return;
        }

        const category = new CategoryModel({
            name: req.body["category-name"],
            description: req.body["category-description"],
        });

        await category.save();

        res.redirect("/");
    },
];

module.exports = { createCategoryGET, createCategoryPOST };