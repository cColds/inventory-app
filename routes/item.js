const express = require("express");
const itemController = require("../controllers/itemController");

const router = express.Router();

router.get("/create-item", itemController.createItemGET);

router.post("/create-item", itemController.createItemPOST);

router.get("/item/:itemId/update-item", itemController.updateItemGET);

router.post("/item/:itemId/update-item", itemController.updateItemPOST);

module.exports = router;
