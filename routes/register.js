'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = false;
var bcrypt = require('bcrypt-nodejs');
var xss = require('xss');
var registered = false;



/* GET home page. */
router.get('/', function(req, res) {
  res.render('register', {loggedin:loggedin});
});

/* GET home page. */
router.post('/', function(req, res) {
  var hash = bcrypt.hashSync(req.body.password);
  var queryStr = "INSERT INTO users (username, hash) VALUES ($1, $2)";
  var parameters = [req.body.username, hash];
  var clean = xss(req.body.username);
  clean = xss(req.body.password);

  dbUtils.queryDb(queryStr, parameters, function(err) {
    if(err) {
      var error = true;
      registered = false;
      res.render('register', {registered:registered,
                              error:error,
                              loggedin:loggedin});
      return console.error('error fetching client from pool', err);
    }

    if(req.body.username === ""){
      var nousername = true;
      registered = false;
      res.render('register', {registered:registered,
                              nousername:nousername,
                              loggedin:loggedin});
      return console.error('error fetching client from pool', err);
    }

    if(req.body.password === ""){
      var nopassword = true;
      registered = false;
      res.render('register', {registered:registered,
                              nopassword:nopassword,
                              loggedin:loggedin});
      return console.error('error fetching client from pool', err);
    }

    registered = true;
    res.render('register',{registered:registered, loggedin:loggedin});
  });
});


module.exports = router;
