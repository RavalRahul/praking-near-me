const pool = require("../config/db");

const getUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

async function getUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

async function createUser(username, email, password,user_type) {
  await pool.query(
    "INSERT INTO users (username, email, password,user_type) VALUES (?, ?, ?,?)",
    [username, email, password, user_type]
  );
}

module.exports = { getUsers, createUser, getUserByEmail };
