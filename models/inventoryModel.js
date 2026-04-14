const pool = require("../database/db");

async function getClassifications() {
  return await pool.query(
    "SELECT * FROM classification ORDER BY classification_name"
  );
}

async function getInventoryByClassificationId(classificationId) {
  return await pool.query(
    "SELECT * FROM inventory WHERE classification_id = $1",
    [classificationId]
  );
}

async function getInventoryById(invId) {
  return await pool.query(
    "SELECT * FROM inventory WHERE inv_id = $1",
    [invId]
  );
}

async function addClassification(name) {
  return await pool.query(
    "INSERT INTO classification (classification_name) VALUES ($1)",
    [name]
  );
}

async function addInventory(data) {
  return await pool.query(
    `INSERT INTO inventory (
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles,
      inv_color, classification_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      data.inv_make,
      data.inv_model,
      data.inv_year,
      data.inv_description,
      data.inv_image,
      data.inv_thumbnail,
      data.inv_price,
      data.inv_miles,
      data.inv_color,
      data.classification_id
    ]
  );
}

async function updateInventory(data) {
  return await pool.query(
    `UPDATE inventory SET
      inv_make=$1,
      inv_model=$2,
      inv_year=$3,
      inv_description=$4
    WHERE inv_id=$5`,
    [
      data.inv_make,
      data.inv_model,
      data.inv_year,
      data.inv_description,
      data.inv_id
    ]
  );
}

async function deleteInventory(invId) {
  return await pool.query(
    "DELETE FROM inventory WHERE inv_id=$1",
    [invId]
  );
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById,
  addClassification,
  addInventory,
  updateInventory,
  deleteInventory
};