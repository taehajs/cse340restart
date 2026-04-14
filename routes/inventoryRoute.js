const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

router.get("/", (req, res) => {
  res.render("inventory/management", { title: "Inventory Management" });
});

router.get("/detail/:inv_id", invController.buildByInvId);

router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);

router.get("/add-vehicle", invController.buildAddVehicle);
router.post("/add-vehicle", invController.addVehicle);

module.exports = router;