'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var xss = require('xss');

router.get('/:username', ensureLoggedIn, login);
router.post('/:username', ensureLoggedIn, changePic );

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
  console.log("changepic params: "+req.params.username);

  dbUtils.queryDb(querygg, parameters, function(err){
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var renderData = {};
    var str = "SELECT * FROM users WHERE username = $1";
    parameters = [req.params.username];
    var loggedin = false;

    dbUtils.queryDb(str, parameters, function(err, results){
      if(err) {
        return console.error('error fetching client from pool', err);
      }

      var imageset;
      renderData.user = results.rows[0];
      console.log("renderdatausertype: "+typeof renderData.user);
      if(results.rows[0]) {
        var imagelink = results.rows[0].image;
      }

      if(imagelink===null || imagelink===''){
        imageset = false;
      }
      else {
        imageset = true;
      }
      if(req.session && req.session.user) {
           console.info(req.session.user);
           loggedin = true;
           var usern = req.session.user.username;
      }
      res.render('profile', {loggedin:loggedin,
                             usern:usern,
                             imagelink:imagelink,
                             imageset:imageset,
                             renderData:renderData
      });
    });
  });
}

function login(req, res){
  var renderData = {};
  console.log("params usern: "+req.params.username);
  var querystr = "SELECT * FROM users WHERE username = $1";
  var parameters = [req.params.username];
  var loggedin = false;

  dbUtils.queryDb(querystr, parameters, function(err, results){
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    var querystr2 = "SELECT * FROM threads WHERE username=$1";

    dbUtils.queryDb(querystr2, parameters, function(err, results2){
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      var imageset;
      renderData.user = results.rows[0];
      renderData.threads = results2.rows;
      console.log("renderdata: "+renderData.threads.threadname);
      if(results.rows[0]) {
        var imagelink = results.rows[0].image;
      }

      if(imagelink===null || imagelink===''){
        imageset = false;
      }
      else {
        imageset = true;
      }
      if(req.session && req.session.user) {
           console.info(req.session.user);
           loggedin = true;
           var usern = req.session.user.username;
      }
      res.render('profile', {loggedin:loggedin,
                             imagelink:imagelink,
                             imageset:imageset,
                             renderData:renderData,
                             usern:usern
      });
    });
  });
}

module.exports = router;
