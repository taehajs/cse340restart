const pool = require("../database");

async function addClassification(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
    const data = await pool.query(sql, [classification_name]);
    return data.rows[0];
  } catch (error) {
    console.error("addClassification error:", error);
    return null;
  }
}

async function addInventory(invData) {
  try {
    const sql = `INSERT INTO inventory 
      (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;
    const values = [
      invData.inv_make,
      invData.inv_model,
      invData.inv_year,
      invData.inv_description,
      invData.inv_image,
      invData.inv_thumbnail,
      invData.inv_price,
      invData.inv_miles,
      invData.inv_color,
      invData.classification_id
    ];
    const data = await pool.query(sql, values);
    return data.rows[0];
  } catch (error) {
    console.error("addInventory error:", error);
    return null;
  }
}

module.exports = { addClassification, addInventory };