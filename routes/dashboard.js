const express = require("express");
const dashboardRoute = express();
const passport = require("passport");
const db = require("../db/dbquery");

// Function to verify authentication
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }

    res.redirect("/log-in");
}

dashboardRoute.get("/", ensureAuthenticated, async (req, res) => {
  const { rows } = await db.getAllMessages();
  console.log(rows);
  res.render("dashboard", { user: req.user, allMessages : rows });
});

dashboardRoute.use("/", async (req, res) => {
  const { username, password } = req.user;
  console.log("The username is: " + username);
  console.log("The password is: " + password);

  const updateStatus = await db.updateMemberStatus(username);
  res.redirect("/dashboard");
  return updateStatus;
});

dashboardRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/log-in",
  })
);

module.exports = dashboardRoute;
