const express = require("express");
const dashboardRoute = express();
const passport = require("passport");
const db = require("../db/dbquery");

dashboardRoute.get("/", (req, res) => {
    res.render("dashboard");
})

dashboardRoute.use("/", async (req, res) => {
    const {username, password} = req.user;
    console.log("The username is: " + username);
    console.log("The password is: " + password);

    const updateStatus = await db.updateMemberStatus(username);
    res.redirect("/dashboard");
    return updateStatus;
})

dashboardRoute.post("/", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/log-in",
}));

module.exports = dashboardRoute;