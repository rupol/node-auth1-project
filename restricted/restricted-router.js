const express = require("express");
const restricted = require("../middleware/restricted");
const router = express.Router();

router.use(restricted());

router.get("/something", async (req, res, next) => {
  const user = req.session.user;

  res.json({
    message: `Hello, ${user.username}! Welcome to the restricted route`
  });
});

module.exports = router;
