const express = require("express");
const router = new express.Router();

const accountController = require("../controllers/accountController");
const favoritesController = require("../controllers/favoritesController");
const utilities = require("../utilities");

router.get("/login", accountController.buildLogin);
router.post("/login", accountController.accountLogin);

router.get("/register", accountController.buildRegister);
router.post("/register", accountController.registerAccount);

router.get(
  "/management",
  utilities.checkJWTToken,
  accountController.buildManagement
);

router.get(
  "/update",
  utilities.checkJWTToken,
  accountController.buildUpdateAccount
);

router.post(
  "/update",
  utilities.checkJWTToken,
  accountController.updateAccount
);

router.post(
  "/update-password",
  utilities.checkJWTToken,
  accountController.updatePassword
);

router.post(
  "/favorite",
  utilities.checkJWTToken,
  favoritesController.addFavorite
);

router.get(
  "/favorites",
  utilities.checkJWTToken,
  favoritesController.buildFavorites
);

router.get("/logout", accountController.logout);

module.exports = router;