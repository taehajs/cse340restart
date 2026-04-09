require("dotenv").config(); 

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const homeRoute = require("./routes/homeRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const accountRoute = require("./routes/accountRoute");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


app.use((req, res, next) => {
  res.locals.loggedIn = req.cookies.jwt ? true : false;
  res.locals.accountType = req.cookies.accountType || null;
  res.locals.firstName = req.cookies.firstName || null;
  next();
});


app.use("/", homeRoute);
app.use("/inventory", inventoryRoute);
app.use("/account", accountRoute);


app.use((req, res) => {
  res.status(404).render("shared/404", { title: "Page Not Found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("shared/500", { title: "Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
