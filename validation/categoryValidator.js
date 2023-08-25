const { body } = require("express-validator");

const nameValidator = body("category-name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Name must be 50 characters or less")
    .escape();

const descriptionValidator = body("category-description")
    .trim()
    .isLength({ max: 350 })
    .withMessage("Description must be 350 characters or less")
    .escape();

module.exports = { nameValidator, descriptionValidator };
