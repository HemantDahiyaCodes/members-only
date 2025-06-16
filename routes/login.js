const express = require("express");
const passport = require("passport");
const localStrategy = require("passport-local");
const pool = require("../db/DbPool");
const bcrypt = require("bcryptjs");

// Creating instance of express
const loginRoute = express();

// Creating passport strategy
passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM userInformation WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Username is incorrect" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Password is incorrect" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM userInformation WHERE id= $1", [
      id,
    ]);
    const user = rows[0];

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

loginRoute.get("/", (req, res) => {
  res.render("login-form.ejs");
});

loginRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/log-in",
  })
);

module.exports = loginRoute;
