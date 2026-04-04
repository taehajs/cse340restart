const express = require("express");
const router = new express.Router();
const invController = require("../controllers/inventoryController");
const invValidate = require("../utilities/inventory-validation");

router.get("/", invController.buildManagement);
router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  invController.addClassification
);

router.get("/add-inventory", invController.buildAddInventory);
router.post("/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  invController.addInventory
);

module.exports = router;