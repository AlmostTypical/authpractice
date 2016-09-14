const passport = require('passport');
const User = require('../models/users');
const secret = require('../config').SECRET;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up options
const jwtOptions = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};
// Create strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  const user_id = jwt_payload.sub;
  User.findById(user_id, function (err, user) {
    if (err) { return done(err, false); }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
});
// tell passport to use this strategy
passport.use(jwtLogin);