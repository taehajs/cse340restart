const invModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function buildManagement(req, res) {
  const data = await invModel.getAllInventory();

  res.render("inventory/management", {
    title: "Inventory Management",
    nav: await utilities.getNav(),
    items: data.rows,
  });
}

async function buildByInvId(req, res) {
  const invId = parseInt(req.params.inv_id);
  const vehicle = await invModel.getVehicleById(invId);

  res.render("inventory/detail", {
    title: "Vehicle Detail",
    nav: await utilities.getNav(),
    vehicle,
  });
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
  buildManagement,
  buildByInvId,
  buildAddClassification,
  addClassification,
  buildAddVehicle,
  addVehicle,
};