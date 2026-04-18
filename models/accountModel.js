const pool = require("../database/db");

async function createAccount(email, password) {
  const sql = `
    INSERT INTO account (
      first_name,
      last_name,
      account_email,
      account_password,
      account_type
    )
    VALUES ($1, $2, $3, $4, 'Client')
    RETURNING *;
  `;
  return await pool.query(sql, [
    "User",
    "User",
    email,
    password
  ]);
}

module.exports = { createAccount };