const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

router.get("/", invController.buildManagement);


router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);


router.get("/add-inventory", invController.buildAddInventory);
router.post("/add-inventory", invController.addInventory);

router.get("/edit/:invId", invController.buildEditInventory);
router.post("/update", invController.updateInventory);


router.get("/delete/:invId", invController.buildDeleteInventory);
router.post("/delete", invController.deleteInventory);

module.exports = router;
