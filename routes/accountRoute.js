const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

function checkLogin(req, res, next) {
  if (!req.session.account) {
    req.flash("notice", "Please log in");
    return res.redirect("/account/login");
  }
  next();
}

router.get("/login", accountController.buildLogin);
router.post("/login", accountController.loginAccount);

router.get("/register", accountController.buildRegister);
router.post("/register", accountController.registerAccount);

router.get("/logout", accountController.logoutAccount);

router.get("/management", checkLogin, accountController.buildManagement);

module.exports = router;