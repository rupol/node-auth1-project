const bcrypt = require("bcryptjs");
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
  } catch (error) {
    next(error);
  }
});

module.exports = router;
