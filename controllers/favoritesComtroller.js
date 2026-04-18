const favModel = require("../models/favoritesModel");
const utilities = require("../utilities");

exports.addFavorite = async (req, res) => {
  try {
    const accountId = res.locals.accountData.account_id;
    const { inv_id } = req.body;

    if (!inv_id) {
      throw new Error("Invalid vehicle");
    }

    await favModel.addFavorite(accountId, inv_id);
    res.redirect("/account/favorites");

  } catch (err) {
    res.render("errors/error", {
      title: "Error",
      message: err.message,
      nav: await utilities.getNav()
    });
  }
};

exports.buildFavorites = async (req, res) => {
  try {
    const accountId = res.locals.accountData.account_id;
    const data = await favModel.getFavorites(accountId);

    res.render("account/favorites", {
      title: "My Favorites",
      nav: await utilities.getNav(),
      vehicles: data
    });

  } catch (err) {
    res.render("errors/error", {
      title: "Error",
      message: err.message,
      nav: await utilities.getNav()
    });
  }
};