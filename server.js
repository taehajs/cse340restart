const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const invRoute = require("./routes/inventoryRoute");
const baseRoute = require("./routes/baseRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(flash());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/", baseRoute);
app.use("/inv", invRoute);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});