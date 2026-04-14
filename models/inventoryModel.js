const pool = require("../database/db");

async function getClassifications() {
  try {
    const result = await pool.query(
      "SELECT * FROM classification ORDER BY classification_name"
    );
    return result;
  } catch (err) {
    console.error("getClassifications ERROR:", err);
    return { rows: [] };
  }
}

async function getInventoryByClassificationId(id) {
  try {
    const result = await pool.query(
      "SELECT * FROM inventory WHERE classification_id = $1",
      [id]
    );
    return result;
  } catch (err) {
    console.error(err);
    return { rows: [] };
  }
}

async function getInventoryById(id) {
  try {
    const result = await pool.query(
      "SELECT * FROM inventory WHERE inv_id = $1",
      [id]
    );
    return result;
  } catch (err) {
    console.error(err);
    return { rows: [] };
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById
};