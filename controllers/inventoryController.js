const invModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function buildByInvId(req, res, next) {
  try {
    const invId = parseInt(req.params.inv_id);

    const vehicleData = await invModel.getVehicleById(invId);

    if (!vehicleData) {
      return next({ status: 404, message: "Vehicle not found" });
    }

    res.render("inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav: await utilities.getNav(),
      vehicle: vehicleData,
    });
  } catch (error) {
    next(error);
  }
}

async function buildAddClassification(req, res) {
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav: await utilities.getNav(),
  });
}

async function addClassification(req, res) {
  await invModel.addClassification(req.body.classification_name);
  res.redirect("/inventory");
}

async function buildAddVehicle(req, res) {
  res.render("inventory/add-vehicle", {
    title: "Add Vehicle",
    nav: await utilities.getNav(),
    classifications: await utilities.buildClassificationList(),
  });
}

async function addVehicle(req, res) {
  await invModel.addVehicle(req.body);
  res.redirect("/inventory");
}

module.exports = {
  buildByInvId,
  buildAddClassification,
  addClassification,
  buildAddVehicle,
  addVehicle,
};