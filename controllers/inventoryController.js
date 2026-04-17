const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function buildByClassificationId(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const data = await inventoryModel.getClassifications();

    res.render("inventory/index", {
      title: "Inventory",
      nav,
      classificationList: data.rows
    });
  } catch (err) {
    next(err);
  }
}

async function buildInventoryByClassificationId(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const data = await inventoryModel.getInventoryByClassificationId(
      req.params.classificationId
    );

    res.render("inventory/classification", {
      title: "Vehicle List",
      nav,
      vehicles: data.rows
    });
  } catch (err) {
    next(err);
  }
}

async function buildByInventoryId(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const data = await inventoryModel.getInventoryById(req.params.invId);

    if (!data.rows.length) {
      return res.status(404).render("errors/error", {
        title: "Not Found",
        message: "Vehicle not found",
        nav
      });
    }

    const vehicleHTML = utilities.buildVehicleDetail(data.rows[0]);

    res.render("inventory/detail", {
      title: `${data.rows[0].inv_make} ${data.rows[0].inv_model}`,
      nav,
      vehicleHTML
    });
  } catch (err) {
    next(err);
  }
}

// add classification
async function buildAddClassification(req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav
    });
  } catch (err) {
    next(err);
  }
}

async function addClassification(req, res, next) {
  try {
    await inventoryModel.addClassification(req.body.classification_name);
    res.redirect("/inventory");
  } catch (err) {
    next(err);
  }
}

// add vehicle
async function buildAddInventory(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();

    res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      classificationList
    });
  } catch (err) {
    next(err);
  }
}

async function addInventory(req, res, next) {
  try {
    await inventoryModel.addInventory(req.body);
    res.redirect("/inventory");
  } catch (err) {
    next(err);
  }
}

// edit
async function buildEditInventory(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const data = await inventoryModel.getInventoryById(req.params.invId);

    res.render("inventory/edit-inventory", {
      title: "Edit Vehicle",
      nav,
      vehicle: data.rows[0]
    });
  } catch (err) {
    next(err);
  }
}

async function updateInventory(req, res, next) {
  try {
    await inventoryModel.updateInventory(req.body);
    res.redirect("/inventory");
  } catch (err) {
    next(err);
  }
}

// delete
async function buildDeleteInventory(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const data = await inventoryModel.getInventoryById(req.params.invId);

    res.render("inventory/delete-confirm", {
      title: "Delete Vehicle",
      nav,
      vehicle: data.rows[0]
    });
  } catch (err) {
    next(err);
  }
}

async function deleteInventory(req, res, next) {
  try {
    await inventoryModel.deleteInventory(req.body.inv_id);
    res.redirect("/inventory");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  buildByClassificationId,
  buildInventoryByClassificationId,
  buildByInventoryId,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory,
  buildEditInventory,
  updateInventory,
  buildDeleteInventory,
  deleteInventory
};