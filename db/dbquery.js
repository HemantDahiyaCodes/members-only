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

async function updateMemberStatus(username) {
  return await pool.query("UPDATE userInformation SET ismember = true WHERE username = $1", [username])
}

async function addMessageToDb(title, timestamp, author, content) {
  return await pool.query("INSERT INTO messages (title, timestamp, author, content) VALUES ($1, $2, $3, $4)", [title, timestamp, author, content]);
}

async function getAllMessages() {
  return await pool.query("SELECT * FROM messages");
}

module.exports = {
  AddUser,
  checkUser,
  updateMemberStatus,
  addMessageToDb,
  getAllMessages,
};
