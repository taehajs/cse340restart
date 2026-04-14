const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  res.render("shared/home", { title: "Home" });
});

module.exports = router;
