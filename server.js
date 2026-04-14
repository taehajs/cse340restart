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
  res.locals.loggedIn = false;
  next();
});

// routes
app.use("/", homeRoute);
app.use("/inventory", inventoryRoute);
app.use("/account", accountRoute);

// 404
app.use((req, res) => {
  res.status(404).render("shared/404", { title: "Not Found" });
});

// error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("shared/500", { title: "Error" });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));