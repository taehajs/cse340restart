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

async function buildAddInventory(req, res) {
  const classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    classificationList,
    message: req.flash("notice")
  });
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

async function buildEditInventory(req, res) {
  const invId = req.params.invId;
  const itemData = await inventoryModel.getInventoryById(invId);
  const classificationList = await utilities.buildClassificationList(itemData.classification_id);
  res.render("inventory/edit-inventory", {
    title: "Edit Inventory",
    classificationList,
    ...itemData,
    message: req.flash("notice")
  });
}

async function updateInventory(req, res) {
  try {
    const data = req.body;
    const result = await inventoryModel.updateInventory(data);
    if (result) {
      req.flash("notice", "Inventory updated successfully.");
      res.redirect("/inv/");
    } else {
      req.flash("notice", "Failed to update inventory.");
      const classificationList = await utilities.buildClassificationList(data.classification_id);
      res.render("inventory/edit-inventory", {
        title: "Edit Inventory",
        classificationList,
        ...data
      });
    }
  } catch (error) {
    console.error("Error updating inventory:", error);
    req.flash("notice", "An unexpected error occurred.");
    res.redirect("/inv/");
  }
}

async function buildDeleteInventory(req, res) {
  const invId = req.params.invId;
  const itemData = await inventoryModel.getInventoryById(invId);
  res.render("inventory/delete-confirm", {
    title: "Delete Inventory",
    ...itemData,
    message: req.flash("notice")
  });
}

async function deleteInventory(req, res) {
  try {
    const { inv_id } = req.body;
    const result = await inventoryModel.deleteInventory(inv_id);
    if (result) {
      req.flash("notice", "Inventory deleted successfully.");
      res.redirect("/inv/");
    } else {
      req.flash("notice", "Failed to delete inventory.");
      res.redirect(`/inv/delete/${inv_id}`);
    }
  } catch (error) {
    console.error("Error deleting inventory:", error);
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