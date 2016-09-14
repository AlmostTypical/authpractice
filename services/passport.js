const passport = require('passport');
const User = require('../models/users');
const secret = require('../config').SECRET;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

// Set up local options
const localOptions = {
  usernameField: 'email',
};
// Create local strategy
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  User.findOne({email:email}, function (err, user) {
    if (err) { return done(err, false)}
    if (user) {
      user.verifyPassword(password, function (err, isMatch) {
        if (err) { return done(err, false); }
        if (!isMatch) { return done(null, false) }
        return done(null, user); // This adds user to req for use in the router and controllers.
      })
    }
    else {return done(null, false)}
  })
});

// Set up jwt options
const jwtOptions = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};
// Create jwt strategy
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
// tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);