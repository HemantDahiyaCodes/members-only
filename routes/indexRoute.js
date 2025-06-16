const express = require("express");
const indexRoute = express();
const contoller = require("../controllers/contoller");


indexRoute.get("/", contoller.SignUpForm)

indexRoute.post("/", contoller.AddUser);

module.exports = indexRoute;