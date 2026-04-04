function buildHome(req, res) {
  res.render("index", { title: "Home", message: "Welcome to Assignment 2!" });
}

function buildAbout(req, res) {
  res.render("about", { title: "About Us", message: "This is the about page." });
}

function buildContact(req, res) {
  res.render("contact", { title: "Contact", message: "Get in touch with us." });
}

module.exports = { buildHome, buildAbout, buildContact };