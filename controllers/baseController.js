const utilities = require("../utilities/");

async function buildHome(req, res) {
  res.render("index", {
    title: "Home",
    nav: await utilities.getNav(),
    message: "Welcome to the site!",
  });
}

async function buildAbout(req, res) {
  res.render("index", {
    title: "About",
    nav: await utilities.getNav(),
    message: "This is the about page.",
  });
}

async function buildContact(req, res) {
  res.render("index", {
    title: "Contact",
    nav: await utilities.getNav(),
    message: "Contact us here.",
  });
}

module.exports = { buildHome, buildAbout, buildContact };