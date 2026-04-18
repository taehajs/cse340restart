const pool = require("../database/");

async function getAccountByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM account WHERE email = $1",
    [email]
  );
  return result.rows[0];
}

async function createAccount(email, password) {
  return pool.query(
    "INSERT INTO account (email, password, account_type) VALUES ($1, $2, 'Client')",
    [email, password]
  );
}

module.exports = {
  getAccountByEmail,
  createAccount
};