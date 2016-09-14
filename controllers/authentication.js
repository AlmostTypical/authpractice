const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/users');

const signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if(!email || !password) {
    return res.status(422).send({
      error: 'You must provide email and password.'
    })
  }
  const newUser = new User ({email, password});
  newUser.save(function (err) {
    if (err) {
      return next(err);
    }
    res.json({
      success: true
    });
  });
};

module.exports = {
  signup
};