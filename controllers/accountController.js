const accountModel = require("../models/accountModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const utilities = require("../utilities/index.js"); 

exports.buildManagement = async (req, res) => {
  if (!res.locals.loggedIn) {
    return res.redirect("/account/login");
  }

  const account = res.locals.accountData;

  res.render("account/management", {
    title: "Account Management",
    nav: await utilities.getNav(),
    firstName: account.email,
    accountType: "Client"
  });
};

exports.buildLogin = async (req, res) => {
  res.render("account/login", {
    title: "Login",
    nav: await utilities.getNav()
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

  const match = await bcrypt.compare(password, account.account_password);

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
      email: account.account_email
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
    nav: await utilities.getNav()
  });
};

exports.registerAccount = async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await accountModel.createAccount(email, hashed);

  res.redirect("/account/login");
};