const pool = require("./DbPool");

async function AddUser(username, password) {
  const verifyUserExists = await pool.query(
    "SELECT * FROM userInformation WHERE username = ($1)",
    [username]
  );

  if (verifyUserExists.rows.length === 0) {
    const user = await pool.query(
      "INSERT INTO userInformation (username, password) VALUES ($1, $2)",
      [username, password]
    );

    return user;
  } else {
    return false;
  }
}

async function checkUser(username, password) {
  return await pool.query("SELECT * FROM userInformation WHERE username = $1 AND password = $2", [username, password]);
}

module.exports = {
  AddUser,
  checkUser,
};
