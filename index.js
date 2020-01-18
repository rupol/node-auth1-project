const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const dbConfig = require("./data/db-config");
const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");
const restrictedRouter = require("./restricted/restricted-router");

const server = express();
const port = process.env.PORT || 4000;

server.use(helmet());
server.use(express.json());
server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "A crime in time, makes nine",
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: false
    },
    store: new KnexSessionStore({
      knex: dbConfig,
      createTable: true
    })
  })
);

server.use("/api", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/restricted", restrictedRouter);

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to our API"
  });
});

server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found"
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occurred, please try again later"
  });
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
