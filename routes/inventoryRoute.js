const express = require("express");
const router = new express.Router();
const invController = require("../controllers/inventoryController");

router.get("/", invController.buildManagement);
router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);
router.get("/add-inventory", invController.buildAddInventory);
router.post("/add-inventory", invController.addInventory);

module.exports = router;