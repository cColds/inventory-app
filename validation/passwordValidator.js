const { body } = require("express-validator");

const passwordValidator = body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .custom((password) => {
        if (password !== process.env.ADMIN_PASS) {
            throw new Error("Password is incorrect");
        }
        return true;
    })
    .escape();

module.exports = passwordValidator;
