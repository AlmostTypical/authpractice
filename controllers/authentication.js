const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/users');
const jwt = require('jwt-simple');
const secret = require('../config').SECRET;


const signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if(!email || !password) {
    return res.status(422).send({
      error: 'You must provide email and password.'
    })
  }
  // Check to see if the email being used already exists in the database.
  User.findOne({email: email}, function (err, existingUser) {
    if (err) { return next(err); }
    if (existingUser) {
      return res.json(422, {
        error: 'This email is already being used.'
      });
    }
    // Save the new user to the list.
    const newUser = new User ({email, password});
    newUser.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        token: tokenGen(newUser) // Pass the token to the client.
      });
    });
  });
};

// Create a token to be passed to the user.
function tokenGen(user) {
  return jwt.encode({
    sub: user.id,
    iat: new Date().getTime()
  }, secret);
}

module.exports = {
  signup
};