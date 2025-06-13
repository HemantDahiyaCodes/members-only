const path = require("node:path");
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const dotenv = require("dotenv").config();
const indexRoute = require("./routes/indexRoute");
const loginRoute = require("./routes/login");
const pool = require("./db/DbPool");
const passport = require("passport");
const dashboard = require("./routes/dashboard");

// Creating express instance
const app = express();

// Creating app session and intializing passport
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());

// Setting view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serving static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Using routes
app.use("/", indexRoute);
app.use("/log-in", loginRoute);
app.use("/dashboard", dashboard);
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/log-in");
  });
});

app.listen(8000, () => {
  console.log("Server started!");
});
