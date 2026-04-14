const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function buildByClassificationId(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classificationList = await inventoryModel.getClassifications();

    res.render("inventory/index", {
      title: "Inventory Home",
      nav,
      classificationList: classificationList || { rows: [] }
    });

  } catch (err) {
    next(err);
  }
}

async function buildInventoryByClassificationId(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const data = await inventoryModel.getInventoryByClassificationId(req.params.classificationId);

    res.render("inventory/classification", {
      title: "Vehicle List",
      nav,
      vehicles: data.rows || []
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

module.exports = {
  buildByClassificationId,
  buildInventoryByClassificationId,
  buildByInventoryId
};