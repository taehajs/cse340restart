const pool = require("../database/db");

async function addFavorite(accountId, invId) {
  const sql = `
    INSERT INTO favorites (account_id, inv_id)
    VALUES ($1, $2)
  `;
  await pool.query(sql, [accountId, invId]);
}

async function getFavorites(accountId) {
  const sql = `
    SELECT i.*
    FROM inventory i
    JOIN favorites f ON i.inv_id = f.inv_id
    WHERE f.account_id = $1
  `;
  const result = await pool.query(sql, [accountId]);
  return result.rows;
}

module.exports = {
  addFavorite,
  getFavorites
};