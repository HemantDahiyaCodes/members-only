const express = require("express");
const dashboardRoute = express();
const passport = require("passport");


dashboardRoute.get("/", (req, res) => {
    res.render("dashboard");
})


dashboardRoute.post("/", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/log-in",
}));

module.exports = dashboardRoute;