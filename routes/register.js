'use strict';

var express = require('express');
var validate = require('../lib/validate');
var dbUtils = require('../utils/db-utils');
var bcrypt = require('bcrypt-nodejs');
var xss = require('xss');
var router = express.Router();
var loggedin = false;
var registered = false;
var nameerror = true;
var emailerror = true;
var error;
var usernameput, passwordput, nameput, emailput;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('register', {loggedin:loggedin,
                          usernameput : '',
                          passwordput : '',
                          nameput : '',
                          emailput : ''});
});

/* GET home page. */
router.post('/', function(req, res) {
  var clean = xss(req.body.username);
  clean = xss(req.body.password);

  usernameput = req.body.username;
  passwordput = req.body.password;
  nameput = req.body.heiti;
  emailput = req.body.email;

  if(usernameput === ""){
    var nousername = true;
    registered = false;
  }

  if(passwordput === ""){
    var nopassword = true;
    registered = false;
  }

  if(!validate.length1(req.body.heiti, 3)){
    nameerror = false;
    registered = false;
  }
  if(!validate.isEmail(req.body.email)){
    emailerror = false;
    registered = false;
  }

  else {
  var queryStr = "SELECT username FROM users WHERE username=$1";
  var parameters = [req.body.username];
  dbUtils.queryDb(queryStr, parameters, function(err, results) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    if(results.rows[0]!==null) {
      error=true;
      res.render('register', {registered:registered,
                              error:error,
                              loggedin:loggedin,
                              usernameput:usernameput,
                              emailput:emailput,
                              nameput:nameput});
    }
    else {
      var hash = bcrypt.hashSync(req.body.password);
      queryStr = "INSERT INTO users (username, hash, email, name) VALUES ($1, $2, $3, $4)";
      parameters = [req.body.username, hash, req.body.email, req.body.heiti];
      registered = true;

      dbUtils.queryDb(queryStr, parameters, function(err) {
        if(err) {
          registered = false;
          res.render('register', {registered:registered,
                                  error:error,
                                  loggedin:loggedin,
                                  usernameput:usernameput,
                                  emailput:emailput,
                                  nameput:nameput});
          return console.error('error fetching client from pool', err);
        }
        res.render('register', {registered:registered,
                                nousername:nousername,
                                nopassword:nopassword,
                                nameerror:nameerror,
                                emailerror:emailerror,
                                loggedin:loggedin,
                                usernameput:usernameput,
                                emailput:emailput,
                                nameput:nameput});
  });

    //return console.error('error fetching client from pool', err);
  }
});



module.exports = router;
