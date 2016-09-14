require('./services/passport');
const passport = require('passport');
const authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res, next) {
    res.send('This is working.');
  });
  app.post('/signup', authentication.signup)
};

