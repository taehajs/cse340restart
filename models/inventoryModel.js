const pool = require("../database");

async function getClassifications() {
  try {
    const data = await pool.query(
      "SELECT * FROM classification ORDER BY classification_name"
    );
    return data;
  } catch (err) {
    console.error("getClassifications error:", err);
    return { rows: [] }; 
  }
}

async function getAllInventory() {
  try {
    const data = await pool.query("SELECT * FROM inventory");
    return data;
  } catch (err) {
    console.error("getAllInventory error:", err);
    return { rows: [] };
  }
}

async function getVehicleById(invId) {
  try {
    const data = await pool.query(
      "SELECT * FROM inventory WHERE inv_id = $1",
      [invId]
    );
    return data.rows[0];
  } catch (err) {
    console.error("getVehicleById error:", err);
    return null;
  }
}

async function addClassification(name) {
  await pool.query(
    "INSERT INTO classification (classification_name) VALUES ($1)",
    [name]
  );
}

async function addVehicle(data) {
  const sql = `
    INSERT INTO inventory 
    (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
  `;
  const values = [
    data.inv_make, data.inv_model, data.inv_year, data.inv_description,
    data.inv_image, data.inv_thumbnail, data.inv_price, data.inv_miles,
    data.inv_color, data.classification_id
  ];
  await pool.query(sql, values);
}

module.exports = {
  getClassifications,
  getAllInventory,
  getVehicleById,
  addClassification,
  addVehicle,
};