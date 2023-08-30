const { validationResult } = require("express-validator");

async function handleCategoryValidation(req, res, next) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const { errors } = result;

        const passwordError = result.errors.find(
            (err) => err.path === "password"
        );
        const nameError = errors.find((err) => err.path === "category-name");
        const descriptionError = errors.find(
            (err) => err.path === "category-description"
        );

        const hasAdminPassword = req.body.password !== undefined;

        const isInvalidAdminPassword =
            hasAdminPassword &&
            req.body.password !== undefined &&
            passwordError?.msg !== undefined;

        res.render("category-form", {
            title: "Create Category",
            name: req.body["category-name"],
            description: req.body["category-description"],
            nameError,
            descriptionError,
            passwordError: isInvalidAdminPassword ? passwordError.msg : false,
            hasAdminPassword,
        });

        return;
    }

    next();
}

module.exports = handleCategoryValidation;
