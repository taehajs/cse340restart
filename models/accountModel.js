const pool = require("../database/");
const bcrypt = require("bcryptjs");

async function register({ account_firstname, account_lastname, account_email, account_password }) {
  const hashedPassword = await bcrypt.hash(account_password, 10);
  await pool.query(
    "INSERT INTO account (account_firstname, account_lastname, account_email, account_password) VALUES ($1,$2,$3,$4)",
    [account_firstname, account_lastname, account_email, hashedPassword]
  );
}

async function login({ account_email, account_password }) {
  const result = await pool.query("SELECT * FROM account WHERE account_email=$1", [account_email]);
  const account = result.rows[0];
  if (!account) throw new Error("Invalid email or password");

  const match = await bcrypt.compare(account_password, account.account_password);
  if (!match) throw new Error("Invalid email or password");

  return account;
}

module.exports = { register, login };
