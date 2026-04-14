const utilities = require("../utilities/");

async function buildHome(req, res) {
  res.render("index", {
    title: "Home",
    nav: await utilities.getNav(),
  });
}

async function buildAbout(req, res) {
  res.render("index", {
    title: "About",
    nav: await utilities.getNav(),
  });
}

async function buildContact(req, res) {
  res.render("index", {
    title: "Contact",
    nav: await utilities.getNav(),
  });
}

module.exports = { buildHome, buildAbout, buildContact };