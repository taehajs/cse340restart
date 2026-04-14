async function buildHome(req, res) {
  res.render("index", { title: "Home", message: "Welcome to the site!" });
}

async function buildAbout(req, res) {
  res.render("index", { title: "About", message: "This is the about page." });
}

async function buildContact(req, res) {
  res.render("index", { title: "Contact", message: "Contact us here." });
}

module.exports = { buildHome, buildAbout, buildContact };