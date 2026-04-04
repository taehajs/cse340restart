const express = require("express");
const router = new express.Router();
const baseController = require("../controllers/baseController");

router.get("/", baseController.buildHome);
router.get("/about", baseController.buildAbout);
router.get("/contact", baseController.buildContact);

module.exports = router;