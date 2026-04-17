const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

router.get("/", invController.buildByClassificationId);
router.get("/type/:classificationId", invController.buildInventoryByClassificationId);
router.get("/detail/:invId", invController.buildByInventoryId);

// add
router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);

router.get("/add-vehicle", invController.buildAddInventory);
router.post("/add-vehicle", invController.addInventory);


router.get("/edit/:invId", invController.buildEditInventory);
router.post("/edit", invController.updateInventory);

router.get("/delete/:invId", invController.buildDeleteInventory);
router.post("/delete", invController.deleteInventory);

router.get("/error", (req, res, next) => {
  next(new Error("Intentional 500 error"));
});

module.exports = router;