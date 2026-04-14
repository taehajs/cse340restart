const accountModel = require("../models/accountModel");
const bcrypt = require("bcryptjs");

exports.buildManagement = async (req, res) => {
  try {
    const account = await accountModel.getById(req.cookies.account_id);

    res.render("account/management", {
      title: "Account Management",
      firstName: account.first_name,
      accountType: account.account_type,
      account_id: account.account_id
    });

  } catch (err) {
    res.status(500).render("errors/error", {
      title: "Error",
      message: "Failed to load account",
      nav: ""
    });
  }
};

exports.buildUpdateView = async (req, res) => {
  const account = await accountModel.getById(req.params.id);

  res.render("account/update", {
    title: "Update Account",
    account
  });
};

exports.updateAccountInfo = async (req, res) => {
  try {
    await accountModel.updateInfo(req.body);

    const account = await accountModel.getById(req.body.account_id);

    res.render("account/management", {
      title: "Account Management",
      firstName: account.first_name,
      accountType: account.account_type,
      account_id: account.account_id,
      message: "Account updated successfully."
    });

  } catch (err) {
    res.render("account/update", {
      title: "Update Account",
      account: req.body,
      errors: [{ msg: "Update failed" }]
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    await accountModel.updatePassword(req.body.account_id, hashed);

    const account = await accountModel.getById(req.body.account_id);

    res.render("account/management", {
      title: "Account Management",
      firstName: account.first_name,
      accountType: account.account_type,
      account_id: account.account_id,
      message: "Password updated successfully."
    });

  } catch (err) {
    res.render("account/update", {
      title: "Update Account",
      account: req.body,
      errors: [{ msg: "Password update failed" }]
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("accountType");
  res.clearCookie("firstName");
  res.clearCookie("account_id");
  res.redirect("/");
};

exports.buildLogin = (req, res) => {
  res.render("account/login", {
    title: "Login"
  });
};

exports.processLogin = (req, res) => {
  res.redirect("/account/");
};

exports.buildRegister = (req, res) => {
  res.render("account/register", {
    title: "Register"
  });
};

exports.registerAccount = (req, res) => {
  res.redirect("/account/login");
};