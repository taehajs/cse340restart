const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function buildManagement(req, res) {
  res.render("inventory/management", {
    title: "Inventory Management",
    message: req.flash("notice")
  });
}

async function buildAddClassification(req, res) {
  res.render("inventory/add-classification", {
    title: "Add Classification",
    message: req.flash("notice")
  });
}

async function addClassification(req, res) {
  const { classification_name } = req.body;
  const result = await inventoryModel.addClassification(classification_name);
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
}

async function buildAddInventory(req, res) {
  const classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    classificationList,
    message: req.flash("notice")
  });
}

async function addInventory(req, res) {
  const data = req.body;
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
}

module.exports = {
  buildManagement,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory
};