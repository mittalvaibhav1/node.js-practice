const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const JwtStratergy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

const config = require("./config");

module.exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

module.exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
}

const opts = {
    jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey = config.secretKey
}

module.exports.jwtPassport = passport.use(new JwtStratergy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        else if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));

module.exports.verifyUser = passport.authenticate('jwt', {session: false});
