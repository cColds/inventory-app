const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/create-category", categoryController.createCategoryGET);

router.post("/create-category", categoryController.createCategoryPOST);

router.get("/categories", categoryController.categoryListGET);

router.get("/categories/:categoryId", categoryController.categoryGET);

router.get(
    "/categories/:categoryId/update-category",
    categoryController.updateCategoryGET
);

router.post(
    "/categories/:categoryId/update-category",
    categoryController.updateCategoryPOST
);

router.get(
    "/categories/:categoryId/delete-category",
    categoryController.deleteCategoryGET
);

router.post(
    "/categories/:categoryId/delete-category",
    categoryController.deleteCategoryPOST
);

module.exports = router;
