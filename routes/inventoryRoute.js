const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");


router.get("/", invController.buildManagement);
router.get("/management", invController.buildManagement);


router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);


router.get("/add-vehicle", invController.buildAddInventory);
router.post("/add-vehicle", invController.addInventory);

router.get("/edit/:invId", invController.buildEditInventory);
router.post("/edit", invController.updateInventory);


router.get("/delete/:invId", invController.buildDeleteInventory);
router.post("/delete", invController.deleteInventory);

module.exports = router;