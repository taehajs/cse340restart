const pool = require("../database/");

async function addFavorite(user_id, inv_id) {
  try {
    const sql = `
      INSERT INTO favorites (user_id, inv_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, inv_id) DO NOTHING
    `;

    return await pool.query(sql, [user_id, inv_id]);
  } catch (error) {
    throw error;
  }
}

async function getFavoritesByUserId(user_id) {
  try {
    const sql = `
      SELECT f.favorite_id, i.*
      FROM favorites f
      JOIN inventory i ON f.inv_id = i.inv_id
      WHERE f.user_id = $1
    `;

    return await pool.query(sql, [user_id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addFavorite,
  getFavoritesByUserId
};