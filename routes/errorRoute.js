const express = require("express");
const router = new express.Router();

router.get("/trigger500", (req, res, next) => {
  next(new Error("Intentional 500 error triggered"));
});

module.exports = router;
