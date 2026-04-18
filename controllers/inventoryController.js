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


async function buildManagement(req, res) {
  const data = await inventoryModel.getAllInventory();

  res.render("inventory/management", {
    title: "Inventory Management",
    nav: await utilities.getNav(),
    items: data.rows
  });
}


async function buildAddClassification(req, res) {
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav: await utilities.getNav()
  });
}

async function addClassification(req, res) {
  const { classification_name } = req.body;

  if (!classification_name) {
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav: await utilities.getNav(),
      errors: [{ msg: "Classification name required" }],
      classification_name
    });
  }

  await inventoryModel.addClassification(classification_name);
  res.redirect("/inventory/management");
}


async function buildAddInventory(req, res) {
  const classificationList = await utilities.buildClassificationList();

  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav: await utilities.getNav(),
    classificationList
  });
}

async function addInventory(req, res) {
  if (!req.body.inv_make) {
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav: await utilities.getNav(),
      message: "All fields required",
      classificationList: await utilities.buildClassificationList()
    });
  }

  await inventoryModel.addInventory(req.body);
  res.redirect("/inventory/management");
}


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
    res.redirect("/inventory/management");
  } catch (err) {
    next(err);
  }
}


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
    res.redirect("/inventory/management");
  } catch (err) {
    next(err);
  }
}


module.exports = {
  buildByClassificationId,
  buildInventoryByClassificationId,
  buildByInventoryId,
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