process.on("uncaughtException", err => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", err => {
  console.error("UNHANDLED REJECTION:", err);
});

require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const homeRoute = require("./routes/homeRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const accountRoute = require("./routes/accountRoute");

const utilities = require("./utilities");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(async (req, res, next) => {
  res.locals.loggedIn = false;

  try {
    res.locals.nav = await utilities.getNav();
  } catch (err) {
    console.error("NAV ERROR:", err);
    res.locals.nav = "<ul><li><a href='/'>Home</a></li></ul>";
  }

  next();
});


app.use("/", homeRoute);
app.use("/inventory", inventoryRoute);
app.use("/account", accountRoute);

app.get("/trigger-error", (req, res, next) => {
  next(new Error("Intentional 500 Error"));
});

// 404
app.use((req, res) => {
  res.status(404).render("errors/error", {
    title: "Not Found",
    message: "Page not found",
    nav: res.locals.nav
  });
});

// 500
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).render("errors/error", {
    title: "Server Error",
    message: err.message || "Something went wrong",
    nav: res.locals.nav
  });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});