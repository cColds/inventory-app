const express = require("express");
const itemController = require("../controllers/itemController");

const router = express.Router();

router.get("/create-item", itemController.createItemGET);

router.post("/create-item", itemController.createItemPOST);

module.exports = router;
