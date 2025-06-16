const express = require("express");

const messageRoute = express();

messageRoute.post("/", (req, res) => {
    const {title, messageContent} = req.body;
    const {username} = req.user;
    const time = new Date();

    console.log("Title of the message: ", title);
    console.log("Message: ", messageContent);
    console.log("This message was created by: ", username);
    console.log("Date created", time.getDate());
    res.redirect("/dashboard");
})

module.exports = messageRoute;