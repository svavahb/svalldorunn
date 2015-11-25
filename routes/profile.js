'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var xss = require('xss');

router.get('/:username', ensureLoggedIn ,login);
router.post('/:username', changePic );

function ensureLoggedIn(req, res, next){
  console.log("ensurefall");
  if(req.session.user){
  next();
  }
  else{
    res.redirect('/login');
  }
}

function changePic(req, res){
  if (req.body.newPicture == ''){
    req.body.newPicture = 'http://oi64.tinypic.com/5o5nc0.jpg';
  }
  var querygg = "UPDATE users SET image = $1 WHERE username  = $2";
  var parameters = [req.body.newPicture, req.params.username];

  dbUtils.queryDb(querygg, parameters, function(err){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var renderData = {};
    var papa = "SELECT * FROM users WHERE username = $1";
    parameters = [req.params.username];
    console.log('changepic:'+req.params.username);
    var loggedin = false;

    dbUtils.queryDb(papa, parameters, function(err, results){
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
  });
}

function login(req, res){
  var renderData = {};
  console.log(req.params.username);
  var querystr = "SELECT * FROM users WHERE username = $1";
  var parameters = [req.params.username];
  var loggedin = false;


  dbUtils.queryDb(querystr, parameters, function(err, results){
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
