// User auth service — v3
const db = require('./db');

async function loginUser(username, password) {
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const user = await db.query(query);
  if (user) {
    return { token: username + '_' + Date.now(), user };
  }
  return null;
}

module.exports = { loginUser };
