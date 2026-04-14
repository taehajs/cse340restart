const pool = require("../database/db");

async function getClassifications() {
  return await pool.query("SELECT * FROM classification ORDER BY classification_name");
}

async function getVehicleById(invId) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [invId]);
    return result.rows[0];
  } catch (error) {
    console.error("DB Error getVehicleById:", error);
    return null;
  }
}

async function addClassification(name) {
  const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
  const result = await pool.query(sql, [name]);
  return result.rows[0];
}

async function addVehicle(data) {
  const sql = `
    INSERT INTO inventory 
    (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;
  
  const values = [
    data.inv_make, data.inv_model, data.inv_year, data.inv_description,
    data.inv_image, data.inv_thumbnail, data.inv_price, data.inv_miles,
    data.inv_color, data.classification_id
  ];

  const result = await pool.query(sql, values);
  return result.rows[0];
}

async function updateVehicle(data) {
  const sql = `
    UPDATE inventory SET
    inv_make=$1, inv_model=$2, inv_year=$3, inv_description=$4,
    inv_image=$5, inv_thumbnail=$6, inv_price=$7, inv_miles=$8,
    inv_color=$9, classification_id=$10
    WHERE inv_id=$11 RETURNING *`;

  const values = [
    data.inv_make, data.inv_model, data.inv_year, data.inv_description,
    data.inv_image, data.inv_thumbnail, data.inv_price, data.inv_miles,
    data.inv_color, data.classification_id, data.inv_id
  ];

  const result = await pool.query(sql, values);
  return result.rows[0];
}

async function deleteVehicle(invId) {
  const sql = "DELETE FROM inventory WHERE inv_id=$1 RETURNING *";
  const result = await pool.query(sql, [invId]);
  return result.rows[0];
}

module.exports = {
  getClassifications,
  getVehicleById,
  addClassification,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};