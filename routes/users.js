const express = require('express');
const authenticate = require('../authenticate');
const passport = require('passport');
const router = express.Router();
const Users = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/signup", (req, res, next) => {
  Users.register(new Users({ username: req.body.username }), req.body.password, (err, user) => {
    if(err) {
      const err = new Error("User with username " + req.body.username + " already exists.");
      err.status = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
    }
    else {
      if(req.body.firstname) {
        user.firstname = req.body.firstname;
      }
      if(req.body.lastname) {
        user.lastname = req.body.lastname;
      }
      user.save((err, user) => {
        if(err) {
          const err = new Error("User with username " + req.body.username + " already exists.");
          err.status = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        }
        else {
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ status: "Registeration Successful", successs: true })
          })
        }
      });
    }
  })
});

router.post("/login", passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
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
});

module.exports = router;
