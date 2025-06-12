const express = require("express");
const dashboardRoute = express();

dashboardRoute.get("/", (req, res) => {
    res.render("dashboard");
});

module.exports = dashboardRoute;