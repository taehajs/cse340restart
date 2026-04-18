const accountModel = require("../models/accountModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const utilities = require("../utilities");

exports.buildManagement = async (req, res) => {
  if (!res.locals.loggedIn) {
    return res.redirect("/account/login");
  }

  const account = res.locals.accountData;

  res.render("account/management", {
    title: "Account Management",
    nav: await utilities.getNav(),
    firstName: account.first_name,
    accountType: account.account_type
  });
};

exports.buildLogin = async (req, res) => {
  res.render("account/login", {
    title: "Login",
    nav: await utilities.getNav(),
    message: null
  });
};

exports.accountLogin = async (req, res) => {
  const { email, password } = req.body;

  const account = await accountModel.getAccountByEmail(email);

  if (!account) {
    return res.render("account/login", {
      title: "Login",
      nav: await utilities.getNav(),
      message: "Invalid email or password"
    });
  }

  const match = await bcrypt.compare(password, account.password);

  if (!match) {
    return res.render("account/login", {
      title: "Login",
      nav: await utilities.getNav(),
      message: "Invalid email or password"
    });
  }

  const token = jwt.sign(
    {
      account_id: account.account_id,
      first_name: account.first_name,
      account_type: account.account_type
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("jwt", token, { httpOnly: true });

  res.redirect("/account/management");
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

exports.buildRegister = async (req, res) => {
  res.render("account/register", {
    title: "Register",
    nav: await utilities.getNav(),
    message: null
  });
};


exports.registerAccount = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || password.length < 6) {
    return res.render("account/register", {
      title: "Register",
      nav: await utilities.getNav(),
      message: "All fields required (password ≥ 6)",
      first_name,
      last_name,
      email
    });
  }

  const existing = await accountModel.getAccountByEmail(email);

  if (existing) {
    return res.render("account/register", {
      title: "Register",
      nav: await utilities.getNav(),
      message: "Email already exists",
      first_name,
      last_name,
      email
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  await accountModel.createAccount(first_name, last_name, email, hashed);

  res.redirect("/account/login");
};


exports.buildUpdateAccount = async (req, res) => {
  const account = res.locals.accountData;

  res.render("account/update", {
    title: "Edit Account",
    nav: await utilities.getNav(),
    account
  });
};