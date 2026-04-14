const accountModel = require("../models/accountModel");
const utilities = require("../utilities/");
const bcrypt = require("bcryptjs");

async function buildLogin(req, res) {
  res.render("account/login", {
    title: "Login",
    nav: await utilities.getNav(),
  });
}

async function loginAccount(req, res, next) {
  try {
    const { email, password } = req.body;

    const account = await accountModel.getAccountByEmail(email);

    if (!account) {
      req.flash("notice", "Account not found");
      return res.redirect("/account/login");
    }

    const match = await bcrypt.compare(password, account.account_password);

    if (match) {
      req.session.account = account;
      return res.redirect("/account/management");
    } else {
      req.flash("notice", "Incorrect password");
      return res.redirect("/account/login");
    }
  } catch (error) {
    next(error);
  }
}

async function buildRegister(req, res) {
  res.render("account/register", {
    title: "Register",
    nav: await utilities.getNav(),
  });
}

async function registerAccount(req, res, next) {
  try {
    const { password, ...rest } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await accountModel.register({
      ...rest,
      account_password: hashedPassword,
    });

    req.flash("notice", "Account created. Please login.");
    res.redirect("/account/login");
  } catch (error) {
    next(error);
  }
}

async function logoutAccount(req, res) {
  req.session.destroy();
  res.redirect("/");
}

async function buildManagement(req, res) {
  res.render("account/management", {
    title: "Account Management",
    nav: await utilities.getNav(),
    account: req.session.account,
  });
}

module.exports = {
  buildLogin,
  loginAccount,
  buildRegister,
  registerAccount,
  logoutAccount,
  buildManagement,
};