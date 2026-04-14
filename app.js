app.get("/trigger-error", (req, res, next) => {
  next(new Error("Test Error"));
});

app.use(async (err, req, res, next) => {
  res.status(500).render("errors/error", {
    title: "Error",
    message: err.message,
    nav: await require("./utilities").getNav()
  });
});