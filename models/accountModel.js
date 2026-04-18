const pool = require("../database/db");

async function getAccountByEmail(email) {
  const sql = `
    SELECT 
      account_id,
      first_name,
      last_name,
      email,
      password,
      account_type
    FROM account
    WHERE email = $1
  `;
  const result = await pool.query(sql, [email]);
  return result.rows[0];
}

async function createAccount(firstName, lastName, email, password) {
  const sql = `
    INSERT INTO account (first_name, last_name, email, password, account_type)
    VALUES ($1, $2, $3, $4, 'Client')
  `;
  await pool.query(sql, [firstName, lastName, email, password]);
}

module.exports = {
  getAccountByEmail,
  createAccount
};