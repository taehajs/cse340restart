const invModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function buildByInvId(req, res, next) {
  try {
    const invId = parseInt(req.params.invId);
    const vehicleData = await invModel.getVehicleById(invId);
    if (!vehicleData) return next({ status: 404, message: "Vehicle not found" });

    const vehicleHTML = utilities.buildVehicleDetail(vehicleData);
    res.render("inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav: await utilities.getNav(),
      content: vehicleHTML,
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
async function addClassification(req, res, next) {
  try {
    const { classification_name } = req.body;
    await invModel.addClassification(classification_name);
    res.redirect("/inv");
  } catch (error) {
    next(error);
  }
}

// 차량 추가
async function buildAddVehicle(req, res) {
  res.render("inventory/add-vehicle", {
    title: "Add Vehicle",
    nav: await utilities.getNav(),
    classifications: await utilities.buildClassificationList(),
  });
}
async function addVehicle(req, res, next) {
  try {
    await invModel.addVehicle(req.body);
    res.redirect("/inv");
  } catch (error) {
    next(error);
  }
}

async function buildEditVehicle(req, res, next) {
  try {
    const invId = parseInt(req.params.invId);
    const vehicle = await invModel.getVehicleById(invId);
    res.render("inventory/edit-vehicle", {
      title: "Edit Vehicle",
      nav: await utilities.getNav(),
      vehicle,
      classifications: await utilities.buildClassificationList(vehicle.classification_id),
    });
  } catch (error) {
    next(error);
  }
}
async function updateVehicle(req, res, next) {
  try {
    await invModel.updateVehicle(req.body);
    res.redirect("/inv");
  } catch (error) {
    next(error);
  }
}


async function buildDeleteVehicle(req, res, next) {
  try {
    const invId = parseInt(req.params.invId);
    const vehicle = await invModel.getVehicleById(invId);
    res.render("inventory/delete-confirm", {
      title: "Delete Vehicle",
      nav: await utilities.getNav(),
      vehicle,
    });
  } catch (error) {
    next(error);
  }
}
async function deleteVehicle(req, res, next) {
  try {
    await invModel.deleteVehicle(req.body.inv_id);
    res.redirect("/inv");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildByInvId,
  buildAddClassification,
  addClassification,
  buildAddVehicle,
  addVehicle,
  buildEditVehicle,
  updateVehicle,
  buildDeleteVehicle,
  deleteVehicle,
};
