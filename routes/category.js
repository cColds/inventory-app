const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/create-category", categoryController.createCategoryGET);

router.post("/create-category", categoryController.createCategoryPOST);

module.exports = router;
