const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");

router.get("/login", (req, res) => {
  res.render("account/login", { title: "Login" });
});

router.get("/management", accountController.buildManagement);


router.get("/update/:id", accountController.buildUpdate);

module.exports = router;
