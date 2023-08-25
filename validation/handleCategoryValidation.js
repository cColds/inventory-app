const { validationResult } = require("express-validator");

async function handleCategoryValidation(req, res, next) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const { errors } = result;

        const nameError = errors.find((err) => err.path === "category-name");
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

    next();
}

module.exports = handleCategoryValidation;
