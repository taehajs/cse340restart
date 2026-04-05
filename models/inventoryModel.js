const pool = require("../database");

async function addClassification(name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1)";
    const result = await pool.query(sql, [name]);
    return result.rowCount;
  } catch (error) {
    console.error("addClassification error:", error);
    return null;
  }
}

async function getClassifications() {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name";
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("getClassifications error:", error);
    return [];
  }
}

async function addInventory(data) {
  try {
    const sql = `INSERT INTO inventory 
      (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
    const values = [
      data.inv_make, data.inv_model, data.inv_year, data.inv_description,
      data.inv_image, data.inv_thumbnail, data.inv_price, data.inv_miles,
      data.inv_color, data.classification_id
    ];
    const result = await pool.query(sql, values);
    return result.rowCount;
  } catch (error) {
    console.error("addInventory error:", error);
    return null;
  }
}

async function getInventoryById(invId) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [invId]);
    return result.rows[0];
  } catch (error) {
    console.error("getInventoryById error:", error);
    return null;
  }
}

async function updateInventory(data) {
  try {
    const sql = `UPDATE inventory SET
      inv_make=$1, inv_model=$2, inv_year=$3, inv_description=$4,
      inv_image=$5, inv_thumbnail=$6, inv_price=$7, inv_miles=$8,
      inv_color=$9, classification_id=$10
      WHERE inv_id=$11`;
    const values = [
      data.inv_make, data.inv_model, data.inv_year, data.inv_description,
      data.inv_image, data.inv_thumbnail, data.inv_price, data.inv_miles,
      data.inv_color, data.classification_id, data.inv_id
    ];
    const result = await pool.query(sql, values);
    return result.rowCount;
  } catch (error) {
    console.error("updateInventory error:", error);
    return null;
  }
}

async function deleteInventory(invId) {
  try {
    const sql = "DELETE FROM inventory WHERE inv_id=$1";
    const result = await pool.query(sql, [invId]);
    return result.rowCount;
  } catch (error) {
    console.error("deleteInventory error:", error);
    return null;
  }
}

module.exports = {
  addClassification,
  getClassifications,
  addInventory,
  getInventoryById,
  updateInventory,
  deleteInventory
};