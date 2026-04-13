const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");

router.get("/login", accountController.buildLogin);
router.post("/login", accountController.loginAccount);

router.get("/register", accountController.buildRegister);
router.post("/register", accountController.registerAccount);

router.get("/logout", accountController.logoutAccount);

router.get("/management", accountController.buildManagement);

module.exports = router;
