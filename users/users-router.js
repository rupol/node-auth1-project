const bcrypt = require("bcryptjs");
const express = require("express");
const usersModel = require("./users-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const authError = {
    message: "You shall not pass!"
  };
  try {
    // authorize the user
    // first, we check to see if there are proper headers
    const { username, password } = req.headers;
    if (!username || !password) {
      return res.status(401).json(authError);
    }

    // next, check to see if the user exists
    const user = await usersModel.getBy({ username }).first();
    if (!user) {
      return res.status(401).json(authError);
    }

    // then, check to see if password is valid
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json(authError);
    }

    // now, user is authenticated, send users array
    const users = await usersModel.get();

    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
