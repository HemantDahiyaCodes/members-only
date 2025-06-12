const express = require("express");
const indexRoute = express();
const signUpController = require("../controllers/signUpController");


indexRoute.get("/", signUpController.SignUpForm)

indexRoute.post("/", signUpController.AddUser)

module.exports = indexRoute;