const express = require('express');
const router = express.Router();
const Users = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/signup", (req, res, next) => {
  Users.findOne({ username: req.body.username })
  .then((user) => {
    if(user !== null) {
      const err = new Error("User with username " + req.body.username + " already exists.");
      err.status = 403;
      next(err);
    }
    else {
      return Users.create({
        username: req.body.username,
        password: req.body.password
      })
    }
  })
  .then((user) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ status: "Registeration Successful", user: user })
  })
  .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  if(!req.session.user) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
      const err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }
    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = auth[0];
    const password = auth[1];

    Users.findOne({ username: username })
    .then((user) => {
      if(user === null) {
        const err = new Error("User with username " + username + " doesn't exists.");
        err.status = 403;
        return next(err);
      }
      else if(user.password !== password) {
        const err = new Error("Your password is incorrect!");
        err.status = 403;
        return next(err);
      }
      else if(user.username ===  username && user.password === password) {
        req.session.user = "authenticated";
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("You are authenticated!");
      }
    })
    .catch((err) => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("You are already authenticated!");
  }
});

router.get("/logout", (req, res, next) => {
  if(req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  }
  else {
    const err = new Error("You are not logged in!");
        err.status = 403;
        return next(err);
  }
})

module.exports = router;
