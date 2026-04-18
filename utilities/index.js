const jwt = require("jsonwebtoken");

function checkJWTToken(req, res, next) {
  if (req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.locals.loggedIn = false;
        return next();
      }
      res.locals.loggedIn = true;
      res.locals.accountData = decoded;
      next();
    });
  } else {
    res.locals.loggedIn = false;
    next();
  }
}