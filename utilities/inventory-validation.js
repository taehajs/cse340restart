const { body } = require("express-validator");
const utilities = require(".");

const classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Classification name must be at least 3 characters long.")
  ];
};

const inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Make must be at least 3 characters."),
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters."),
    body("inv_year")
      .isInt({ min: 1900, max: 2100 })
      .withMessage("Year must be a valid number."),
    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),
    body("inv_miles")
      .isInt({ min: 0 })
      .withMessage("Miles must be a positive integer."),
    body("inv_color")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters."),
    body("classification_id")
      .isInt()
      .withMessage("You must select a classification.")
  ];
};

const checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      errors: errors.array(),
      classification_name: req.body.classification_name
    });
  }
  next();
};

const checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const classificationList = await utilities.buildClassificationList(req.body.classification_id);
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      errors: errors.array(),
      classificationList,
      ...req.body
    });
  }
  next();
};

module.exports = { classificationRules, inventoryRules, checkClassificationData, checkInventoryData };