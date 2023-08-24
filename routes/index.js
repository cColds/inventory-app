const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

/* GET home page. */
router.get("/", indexController.home);

router.get("/item/:itemId", (req, res) => {
    res.send("Item page not implemented (GET)");
});

module.exports = router;
