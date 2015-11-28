'use strict';

var express = require('express');
var validate = require('../lib/validate');
var dbUtils = require('../utils/db-utils');
var bcrypt = require('bcrypt-nodejs');
var xss = require('xss');
var router = express.Router();
var loggedin = false;
var registered = true;
var nameerror, emailerror, imageerror, usernameerror, emerror, passworderror;
var usernameput, passwordput, passwordput2, nameput,
    emailput, imageput, aboutput;
var nousername, nopassword;

/* GET home page. */
router.get('/', function(req, res) {
  nameerror = true;
  emailerror = true;
  usernameerror = false;
  emerror = false;
  registered = true;
  imageerror = true;
  res.render('register', {loggedin:loggedin,
                          usernameput : '',
                          passwordput : '',
                          nameput : '',
                          emailput : '',
                          imageput : '',
                          aboutput: ''});
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
  imageerror = false;

  usernameput = req.body.username;
  passwordput = req.body.password;
  passwordput2 = req.body.password2;
  nameput = req.body.heiti;
  emailput = req.body.email;
  imageput = req.body.image;
  aboutput = req.body.about;

  if(!validate.required(usernameput)){
    nousername = true;
    registered = false;
  }

  if(!validate.length1(passwordput, 1)){
    nopassword = true;
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
    passworderror = true;
    registered = false;
  }
  if (req.body.image===''){
    req.body.image = 'http://oi64.tinypic.com/5o5nc0.jpg';
  }
  if(!validate.isImage(req.body.image)) {
    imageerror = true;
    registered = false;
  }


      var hash = bcrypt.hashSync(req.body.password);
      var queryStr = 'INSERT INTO users' +
       ' (username, hash, email, name, image, aboutme)' +
       ' VALUES ($1, $2, $3, $4, $5, $6)';
      var parameters = [req.body.username, hash, req.body.email,
                        req.body.heiti, req.body.image, req.body.about];

      if(registered === true){
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

          console.log('hæ');
          res.render('register', {registered:registered,
                                  nousername:nousername,
                                  nopassword:nopassword,
                                  nameerror:nameerror,
                                  emailerror:emailerror,
                                  imageerror:imageerror,
                                  loggedin:loggedin,
                                  usernameput:usernameput,
                                  emailput:emailput,
                                  nameput:nameput,
                                  usernameerror:usernameerror,
                                  emerror:emerror,
                                  passworderror:passworderror,
                                  imageput:imageput,
                                  aboutput:aboutput});
          return console.error('error fetching client from pool', err);
        }
        res.render('register', {registered:registered,
                                nousername:nousername,
                                nopassword:nopassword,
                                nameerror:nameerror,
                                emailerror:emailerror,
                                imageerror:imageerror,
                                loggedin:loggedin,
                                usernameput:usernameput,
                                emailput:emailput,
                                nameput:nameput,
                                usernameerror:usernameerror,
                                emerror:emerror,
                                passworderror:passworderror,
                                imageput:imageput,
                                aboutput:aboutput});
      });
    }
    else {

        res.render('register', {registered:registered,
                                nousername:nousername,
                                nopassword:nopassword,
                                nameerror:nameerror,
                                emailerror:emailerror,
                                imageerror:imageerror,
                                loggedin:loggedin,
                                usernameput:usernameput,
                                emailput:emailput,
                                nameput:nameput,
                                passworderror:passworderror,
                                imageput:imageput,
                                aboutput:aboutput});
                              }
  });




module.exports = router;
