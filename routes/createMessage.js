const express = require("express");
const db = require("../db/dbquery");

const messageRoute = express();


messageRoute.get("/", (req, res) => {
    res.redirect("/log-in");
});

messageRoute.post("/", async (req, res) => {
    const {title, messageContent} = req.body;
    const {username} = req.user;
    const time = new Date();
    const dateFormat = `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
    console.log("Title of the message: ", title);
    console.log("Message: ", messageContent);
    console.log("This message was created by: ", username);
    console.log("Date created", dateFormat);

    const message = await db.addMessageToDb(title, time, username, messageContent);
    res.redirect("/dashboard");

    return message;
})

module.exports = messageRoute;