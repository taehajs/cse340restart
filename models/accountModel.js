const pool = require("../database/db");

async function getAccountByEmail(email) {
  const sql = "SELECT * FROM account WHERE account_email = $1";
  const result = await pool.query(sql, [email]);
  return result.rows[0];
}

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
  return pool.query(sql, ["User", "User", email, password]);
}

module.exports = {
  getAccountByEmail,
  createAccount
};