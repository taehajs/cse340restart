const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");
const utilities = require("../utilities");


router.get("/", invController.buildByClassificationId);
router.get("/type/:classificationId", invController.buildInventoryByClassificationId);
router.get("/detail/:invId", invController.buildByInventoryId);


router.get(
  "/management",
  utilities.checkJWTToken,
  utilities.checkEmployee,
  invController.buildManagement
);

router.get(
  "/add-classification",
  utilities.checkJWTToken,
  utilities.checkEmployee,
  invController.buildAddClassification
);

router.post(
  "/add-classification",
  utilities.checkJWTToken,
  utilities.checkEmployee,
  invController.addClassification
);

router.get(
  "/add-inventory",
  utilities.checkJWTToken,
  utilities.checkEmployee,
  invController.buildAddInventory
);

router.post(
  "/add-inventory",
  utilities.checkJWTToken,
  utilities.checkEmployee,
  invController.addInventory
);

module.exports = router;