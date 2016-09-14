const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema ({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  }
});

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { next(err); }
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    })
  })
});

userSchema.methods.verifyPassword = function (candidate, callback) {
  const user = this;
  bcrypt.compare(candidate, user.password, function (err, isMatch) {
    if (err) { return callback(err) }
    callback(null, isMatch);
  })
};

module.exports = mongoose.model('User', userSchema, 'users');