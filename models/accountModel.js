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

async function updateAccount(firstName, lastName, email, accountId) {
  const sql = `
    UPDATE account
    SET first_name = $1,
        last_name = $2,
        email = $3
    WHERE account_id = $4
  `;
  await pool.query(sql, [firstName, lastName, email, accountId]);
}

async function updatePassword(password, accountId) {
  const sql = `
    UPDATE account
    SET password = $1
    WHERE account_id = $2
  `;
  await pool.query(sql, [password, accountId]);
}

module.exports = {
  getAccountByEmail,
  createAccount,
  updateAccount,
  updatePassword
};