const { validationResult } = require("express-validator");
const CategoryModel = require("../models/category");
const ItemModel = require("../models/item");
const handleCategoryValidation = require("../validation/handleCategoryValidation");
const {
    nameValidator,
    descriptionValidator,
} = require("../validation/categoryValidator");
const passwordValidator = require("../validation/passwordValidator");

async function createCategoryGET(req, res) {
    res.render("category-form", {
        title: "Create Category",
        name: "",
        description: "",
        nameError: "",
        descriptionError: "",
        passwordError: false,
        hasAdminPassword: false,
    });
}

const createCategoryPOST = [
    nameValidator,
    descriptionValidator,
    handleCategoryValidation("Create Category"),
    async (req, res) => {
        const category = new CategoryModel({
            name: req.body["category-name"],
            description: req.body["category-description"],
        });

        await category.save();

        res.redirect(category.url);
    },
];

async function categoryListGET(req, res) {
    const categories = await CategoryModel.find();

    res.render("category-list", { title: "Categories", categories });
}

async function categoryGET(req, res) {
    const category = await CategoryModel.findById(req.params.categoryId);

    res.render("category", { title: "Category", category });
}

async function updateCategoryGET(req, res) {
    const category = await CategoryModel.findById(req.params.categoryId);
    const { name, description } = category;

    res.render("category-form", {
        title: "Update Category",
        name,
        description,
        nameError: "",
        descriptionError: "",
        passwordError: false,
        hasAdminPassword: true,
    });
}

const updateCategoryPOST = [
    passwordValidator,
    nameValidator,
    descriptionValidator,
    handleCategoryValidation("Update Category"),

    async (req, res) => {
        const category = new CategoryModel({
            _id: req.params.categoryId,
            name: req.body["category-name"],
            description: req.body["category-description"],
        });

        await CategoryModel.findByIdAndUpdate(req.params.categoryId, category);

        res.redirect(category.url);
    },
];

async function deleteCategoryGET(req, res) {
    try {
        const category = await CategoryModel.findById(req.params.categoryId);

        const itemsWithCategory = await ItemModel.find({
            category: { _id: req.params.categoryId },
        }).populate("category");

        res.render("delete-category", {
            title: "Delete Category",
            category,
            itemsWithCategory,
            passwordError: false,
            hasAdminPassword: true,
        });
    } catch (e) {
        console.error("Something went wrong: ", e);

        res.send(`${e}`);
    }
}

const deleteCategoryPOST = [
    passwordValidator,
    async (req, res) => {
        try {
            const category = await CategoryModel.findById(
                req.params.categoryId
            );
            const itemsWithCategory = await ItemModel.find({
                category: { _id: req.params.categoryId },
            }).populate("category");
            const result = validationResult(req);

            if (itemsWithCategory.length || !result.isEmpty()) {
                res.render("delete-category", {
                    title: "Delete Category",
                    category,
                    itemsWithCategory,
                    passwordError: result.errors[0].msg,
                });

                return;
            }

            await CategoryModel.deleteOne({ _id: req.params.categoryId });
            res.redirect("/categories");
        } catch (error) {
            console.error("Something went wrong: ", error);
            res.send(`${error}`);
        }
    },
];

module.exports = {
    createCategoryGET,
    createCategoryPOST,
    categoryListGET,
    categoryGET,
    updateCategoryGET,
    updateCategoryPOST,
    deleteCategoryGET,
    deleteCategoryPOST,
};
