const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

router.get("/detail/:inv_id", invController.buildByInvId);

router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);

router.get("/add-vehicle", invController.buildAddVehicle);
router.post("/add-vehicle", invController.addVehicle);

router.get("/edit/:inv_id", invController.buildEditVehicle);
router.post("/update", invController.updateVehicle);

router.get("/delete/:inv_id", invController.buildDeleteVehicle);
router.post("/delete", invController.deleteVehicle);

module.exports = router;