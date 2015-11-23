'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var xss = require('xss');

router.get('/:username', ensureLoggedIn ,login);
router.post('/');

function ensureLoggedIn(req, res, next){
  console.log("ensurefall");
  if(req.session.user){
  next();
  }
  else{
    res.redirect('/login');
  }
}

function login(req, res){
  console.log("loginfall");
  var renderData = {};
  var username = "SELECT * FROM users WHERE username = $1";
  var parameters = [req.params.username];
  var loggedin = false;


  dbUtils.queryDb(username, parameters, function(err, results){
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    var imageset;
    renderData.user = results.rows[0];
    var imagelink = results.rows[0].image;
    console.log("hæ?");

    if(imagelink===null || imagelink===''){
      imageset = false;
    }
    else {
      imageset = true;
    }

    if(req.session && req.session.user &&
       req.session.user.username === req.params.username) {
         console.info(req.session.user);
         loggedin = true;
         var usern = [req.params.username];
      res.render('profile', {loggedin:loggedin,
                             usern:usern,
                             imagelink:imagelink,
                             imageset:imageset,
                             renderData:renderData
      });
    }
  });
}

module.exports = router;
