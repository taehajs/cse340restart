const pool = require("../database/db");

exports.getById = async (id) => {
  const result = await pool.query("SELECT * FROM account WHERE account_id=$1", [id]);
  return result.rows[0];
};

exports.updateInfo