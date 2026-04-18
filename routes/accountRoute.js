const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");

router.get("/login", accountController.buildLogin);
router.post("/login", accountController.accountLogin);

router.get("/register", accountController.buildRegister);
router.post("/register", accountController.registerAccount);

router.get("/management", accountController.buildManagement);
router.get("/logout", accountController.logout);

module.exports = router;