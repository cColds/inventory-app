const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

/* GET home page. */
router.get("/", indexController.homePage);

router.get("/item/:itemId", indexController.itemPage);

module.exports = router;
