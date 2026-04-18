const favoritesModel = require("../models/favoritesModel");
const utilities = require("../utilities");

async function addFavorite(req, res, next) {
  try {
    const user_id = res.locals.accountData.account_id;
    const inv_id = req.body.inv_id;

    const result = await favoritesModel.addFavorite(user_id, inv_id);

    if (result.rowCount) {
      return res.redirect("/account/favorites");
    }

    res.redirect("/account/favorites");

  } catch (err) {
    next(err);
  }
}

async function buildFavorites(req, res, next) {
  try {
    const user_id = res.locals.accountData.account_id;
    const nav = await utilities.getNav();

    const data = await favoritesModel.getFavoritesByUserId(user_id);

    res.render("account/favorites", {
      title: "My Favorites",
      nav,
      favorites: data.rows
    });

  } catch (err) {
    next(err);
  }
}

module.exports = {
  addFavorite,
  buildFavorites
};