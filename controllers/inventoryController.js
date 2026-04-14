const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function buildByClassificationId(req, res) {
  const nav = await utilities.getNav();
  const classificationList = await inventoryModel.getClassifications();

  res.render("inventory/index", {
    title: "Inventory Home",
    nav,
    classificationList,
    errors: null
  });
}

async function buildInventoryByClassificationId(req, res) {
  const classificationId = req.params.classificationId;

  const nav = await utilities.getNav();
  const data = await inventoryModel.getInventoryByClassificationId(classificationId);

  res.render("inventory/classification", {
    title: "Vehicle List",
    nav,
    vehicles: data.rows,
    errors: null
  });
}

async function buildByInventoryId(req, res) {
  const invId = req.params.invId;

  const nav = await utilities.getNav();
  const data = await inventoryModel.getInventoryById(invId);

  const vehicleHTML = utilities.buildVehicleDetail(data.rows[0]);

  res.render("inventory/detail", {
    title: "Vehicle Detail",
    nav,
    vehicleHTML,
    errors: null
  });
}

async function buildAddClassification(req, res) {
  const nav = await utilities.getNav();

  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null
  });
}

async function addClassification(req, res) {
  const { classification_name } = req.body;

  if (!classification_name) {
    const nav = await utilities.getNav();
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: [{ msg: "Classification required" }]
    });
  }

  await inventoryModel.addClassification(classification_name);
  res.redirect("/inventory");
}

async function buildAddInventory(req, res) {
  const nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList();

  res.render("inventory/add-inventory", {
    title: "Add Vehicle",
    nav,
    classificationList,
    errors: null
  });
}

async function addInventory(req, res) {
  const data = req.body;

  if (!data.inv_make || !data.inv_model) {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();

    return res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      classificationList,
      errors: [{ msg: "All fields required" }]
    });
  }

  await inventoryModel.addInventory(data);
  res.redirect("/inventory");
}

async function buildEditInventory(req, res) {
  const invId = req.params.invId;

  const nav = await utilities.getNav();
  const data = await inventoryModel.getInventoryById(invId);

  const classificationList = await utilities.buildClassificationList(
    data.rows[0].classification_id
  );

  res.render("inventory/edit-inventory", {
    title: "Edit Vehicle",
    nav,
    classificationList,
    vehicle: data.rows[0],
    errors: null
  });
}

async function updateInventory(req, res) {
  await inventoryModel.updateInventory(req.body);
  res.redirect("/inventory");
}

async function buildDeleteInventory(req, res) {
  const invId = req.params.invId;

  const nav = await utilities.getNav();
  const data = await inventoryModel.getInventoryById(invId);

  res.render("inventory/delete-confirm", {
    title: "Delete Vehicle",
    nav,
    vehicle: data.rows[0],
    errors: null
  });
}

async function deleteInventory(req, res) {
  const { inv_id } = req.body;

  await inventoryModel.deleteInventory(inv_id);
  res.redirect("/inventory");
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