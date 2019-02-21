const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

// use user model
const User = mongoose.model('users');
// use keys file
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          // if user is found
          if (user) {
            // null as err and the actual user
            return done(null, user);
          }
          // false cause there is no user
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};