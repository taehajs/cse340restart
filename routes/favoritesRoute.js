router.post(
  "/favorite",
  utilities.checkJWTToken,
  favoritesController.addFavorite
);

router.get(
  "/favorites",
  utilities.checkJWTToken,
  favoritesController.buildFavorites
);