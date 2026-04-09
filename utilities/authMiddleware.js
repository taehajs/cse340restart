const jwt = require("jsonwebtoken");

function checkEmployeeOrAdmin(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.render("account/login", { title: "Login", message: "Please log in." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.account_type === "Employee" || decoded.account_type === "Admin") {
      req.account = decoded;
      return next();
    }
    return res.render("account/login", { title: "Login", message: "Access denied." });
  } catch (err) {
    return res.render("account/login", { title: "Login", message: "Invalid token." });
  }
}

module.exports = { checkEmployeeOrAdmin };
