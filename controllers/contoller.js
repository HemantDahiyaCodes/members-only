const db = require("../db/dbquery");
const bcrypt = require("bcryptjs");

function SignUpForm(req, res) {
  console.log("Loading the form!");
  res.render("index");
}

async function AddUser(req, res) {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Your username is: ", username);
  console.log("Your password is: ", hashedPassword);

  const user = await db.AddUser(username, hashedPassword);

  if (user === false) {
    throw new Error("User Already exists");
  }

  res.redirect("/");

  return user;
}

module.exports = {
  SignUpForm,
  AddUser,
};
