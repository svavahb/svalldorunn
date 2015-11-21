'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = false;
var error = false;
var bcrypt = require('bcrypt-nodejs');
var xss = require('xss');


/* GET home page. */
router.get('/', function(req, res) {
  var hash = bcrypt.hashSync("bacon");
  console.log(bcrypt.compareSync("bacon", hash)); // true
  console.log(bcrypt.compareSync("veggies", hash)); // false
  res.render('login', {loggedin:loggedin});
});

/* GET home page. */
router.post('/', function(req, res) {

  var username = "SELECT * FROM users WHERE username = $1";
  var parameters = [req.body.username];
  /*var clean = xss(req.body.username);
  clean = xss(req.body.password);*/

  dbUtils.queryDb(username, parameters, function(err,result) {
    if(err) {
      res.render('login', {loggedin:loggedin});
      return console.error('error fetching client from pool', err);
    }

    var user =  result.rows[0];

    if(!user){
      error = true;
      loggedin = false;
      res.render('login', {error:error,
                           loggedin:loggedin});
      return console.error('!user', err);
    }

    if (user) {
      var hashtrue = bcrypt.compareSync(req.body.password, user.hash);
      if (hashtrue === false){
      console.log(hashtrue);
      }
      console.log(result.rows[0].hash);


      if(!hashtrue){
        error = true;
        loggedin = false;
        res.render('login', {error:error,
                             loggedin:loggedin});
        return console.error('!hashtrue', err);
      }
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        res.redirect('/profile/'+user.username);
      });
    }
  });



});


module.exports = router;
