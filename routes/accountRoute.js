const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");

router.get("/management", accountController.buildManagement);
router.get("/update/:id", accountController.buildUpdateView);

router.post("/update-info", accountController.updateAccountInfo);
router.post("/update-password", accountController.updatePassword);

router.get("/logout", accountController.logout);

module.exports = router;
