'use strict';

var express = require('express');
var validate = require('../lib/validate');
var dbUtils = require('../utils/db-utils');
var bcrypt = require('bcrypt-nodejs');
var xss = require('xss');
var router = express.Router();
var loggedin = false;
var registered = true;
var nameerror, emailerror;
var usernameerror, emerror;
var usernameput, passwordput, passwordput2, nameput, emailput;

/* GET home page. */
router.get('/', function(req, res) {
  nameerror = true;
  emailerror = true;
  usernameerror = false;
  emerror = false;
  registered = true;
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
  nameerror = true;
  emailerror = true;
  usernameerror = false;
  emerror = false;
  registered = true;

  usernameput = req.body.username;
  passwordput = req.body.password;
  passwordput2 = req.body.password2;
  nameput = req.body.heiti;
  emailput = req.body.email;

  if(usernameput === ""){
    var nousername = true;
    registered = false;
  }

  if(!validate.length1(passwordput, 1)){
    var nopassword = true;
    registered = false;
  }

  if(!validate.length1(nameput, 3)){
    nameerror = false;
    registered = false;
  }
  if(!validate.isEmail(req.body.email)){
    emailerror = false;
    registered = false;
  }
  if(passwordput!==passwordput2){
    var passworderror = true;
    registered = false;
  }



      var hash = bcrypt.hashSync(req.body.password);
      var queryStr = "INSERT INTO users (username, hash, email, name) VALUES ($1, $2, $3, $4)";
      var parameters = [req.body.username, hash, req.body.email, req.body.heiti];

      if(registered == true){
      dbUtils.queryDb(queryStr, parameters, function(err) {
        if(err) {
          if((/.*(username).*/).test(err)) {
            usernameerror = true;
            registered=false;
          }
          else {usernameerror=false;}
          if((/.*(email).*/).test(err)) {
            emerror = true;
            registered=false;
          }
          else {emerror=false;}

          console.log("hæ");
          res.render('register', {registered:registered,
                                  nousername:nousername,
                                  nopassword:nopassword,
                                  nameerror:nameerror,
                                  emailerror:emailerror,
                                  loggedin:loggedin,
                                  usernameput:usernameput,
                                  emailput:emailput,
                                  nameput:nameput,
                                  usernameerror:usernameerror,
                                  emerror:emerror,
                                  passworderror:passworderror});
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
                                nameput:nameput,
                                usernameerror:usernameerror,
                                emerror:emerror,
                                passworderror:passworderror});
      });
    }
    else {

        res.render('register', {registered:registered,
                                nousername:nousername,
                                nopassword:nopassword,
                                nameerror:nameerror,
                                emailerror:emailerror,
                                loggedin:loggedin,
                                usernameput:usernameput,
                                emailput:emailput,
                                nameput:nameput,
                                passworderror:passworderror});
                              }
  });




module.exports = router;
