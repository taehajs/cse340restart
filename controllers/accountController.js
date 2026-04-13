const accountModel = require("../models/account-model");
const utilities = require("../utilities/");

async function buildLogin(req, res) {
  res.render("account/login", { title: "Login", nav: await utilities.getNav() });
}
async function loginAccount(req, res, next) {
  try {
    const account = await accountModel.login(req.body);
    req.session.account = account;
    res.redirect("/account/management");
  } catch (error) {
    next(error);
  }
}

async function buildRegister(req, res) {
  res.render("account/register", { title: "Register", nav: await utilities.getNav() });
}
async function registerAccount(req, res, next) {
  try {
    await accountModel.register(req.body);
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
