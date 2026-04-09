const express = require("express");
const path = require("path");
const app = express();
const inventoryRoute = require("./routes/inventoryRoute");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/inventory", inventoryRoute);

app.use((req, res, next) => {
  res.status(404).render("shared/404", { title: "Page Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("shared/500", { title: "Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
