const express = require('express');
const authentication = require('./controllers/authentication');
console.log(typeof authentication.signup);

module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.send('This is working.');
  });
  app.post('/signup', authentication.signup)
};

