const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function addClassification(req, res) {
  try {
    const { classification_name } = req.body;
    const errors = [];

    if (!utilities.checkClassificationName(classification_name)) {
      errors.push({ msg: "Classification name is required." });
    }

    if (errors.length > 0) {
      return res.render("inventory/add-classification", {
        title: "Add Classification",
        classification_name,
        errors
      });
    }

    const result = await inventoryModel.addClassification(classification_name.trim());
    if (result) {
      req.flash("notice", "Classification added successfully.");
      res.redirect("/inv/");
    } else {
      req.flash("notice", "Failed to add classification.");
      res.render("inventory/add-classification", {
        title: "Add Classification",
        classification_name
      });
    }
  } catch (error) {
    console.error("Error adding classification:", error);
    req.flash("notice", "An unexpected error occurred.");
    res.redirect("/inv/");
  }
}

async function addInventory(req, res) {
  try {
    const data = req.body;
    const errors = [];

    if (!utilities.checkInventoryData(data)) {
      errors.push({ msg: "All required fields must be filled." });
    }

    if (errors.length > 0) {
      const classificationList = await utilities.buildClassificationList(data.classification_id);
      return res.render("inventory/add-inventory", {
        title: "Add Inventory",
        classificationList,
        ...data,
        errors
      });
    }

    const result = await inventoryModel.addInventory(data);
    if (result) {
      req.flash("notice", "Inventory item added successfully.");
      res.redirect("/inv/");
    } else {
      req.flash("notice", "Failed to add inventory.");
      const classificationList = await utilities.buildClassificationList(data.classification_id);
      res.render("inventory/add-inventory", {
        title: "Add Inventory",
        classificationList,
        ...data
      });
    }
  } catch (error) {
    console.error("Error adding inventory:", error);
    req.flash("notice", "An unexpected error occurred.");
    res.redirect("/inv/");
  }
}

module.exports = {
  buildManagement,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory,
  buildEditInventory,
  updateInventory,
  buildDeleteInventory,
  deleteInventory
};