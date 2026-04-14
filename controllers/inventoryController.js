const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");


async function buildByClassificationId(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const data = await inventoryModel.getClassifications();

    res.render("inventory/index", {
      title: "Inventory Home",
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
      title: "Vehicle Detail",
      nav,
      vehicleHTML
    });
  } catch (err) {
    next(err);
  }
}


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


module.exports = {
  buildByClassificationId,
  buildInventoryByClassificationId,
  buildByInventoryId,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory
};