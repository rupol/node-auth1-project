const bcrypt = require("bcryptjs");
const db = require("../data/db-config");

function get(id) {
  let query = db("users");

  if (id) {
    return query.where({ id }).first("id", "username");
  } else {
    return query.select("id", "username");
  }
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db("users").insert(user);

  return get(id);
}

module.exports = {
  get,
  add
};
