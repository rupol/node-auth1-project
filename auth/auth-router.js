const bcrypt = require("bcryptjs");
const restricted = require("../middleware/restricted");
const express = require("express");
const usersModel = require("../users/users-model");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = await usersModel.add(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersModel.getBy({ username }).first();
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      req.session.user = user;

      res.status(200).json({
        message: "Logged in",
        user: user.id
      });
    } else {
      res.status(401).json({
        message: "You shall not pass!"
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/logout", restricted(), (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    } else {
      res.json({
        message: "Hasta luego!"
      });
    }
  });
});

module.exports = router;
