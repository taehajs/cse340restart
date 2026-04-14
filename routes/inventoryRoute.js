const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")

router.get("/", invController.buildByClassificationId)
router.get("/detail/:inv_id", invController.buildByInventoryId)

router.get("/management", invController.buildManagementView)
router.get("/add-classification", invController.buildAddClassification)
router.post("/add-classification", invController.addClassification)

router.get("/add-vehicle", invController.buildAddInventory)
router.post("/add-vehicle", invController.addInventory)

module.exports = router