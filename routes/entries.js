'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var xss = require('xss');

router.get('/', ensureLoggedIn, prufurender, login);
router.post('/',postEntries, prufurender);


function login(req, res){
  var renderData = {};
  var username = "SELECT * FROM users WHERE username = $1";
  var parameters = [req.params.username];
  var loggedin = false;


  dbUtils.queryDb(username, parameters, function(err, results){
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    renderData.user = results.rows[0];

    if(req.session && req.session.user &&
       req.session.user.username === req.params.username) {
         console.info(req.session.user);
         loggedin = true;
         var usern = [req.params.username];
      res.render('entries', {loggedin:loggedin,
                             usern:usern
      });
    }
  });
}

function ensureLoggedIn(req, res, next){
    if(req.session.user){
    next();
    }
    else{
      res.redirect('/login');
    }
}

function prufurender(req, res) {
    var login = "select * FROM entries ORDER BY date DESC LIMIT 20";
    console.log(req.session);
    var parameters = [];

    dbUtils.queryDb(login, parameters, function(err,result) {
      if(err) {
        res.render('login', {loggedin:loggedin});
        return console.error('error fetching client from pool', err);
      }
      var entries = result;
      var usern = req.session.user.username;


    res.render('entries', {session : req.session,
                          loggedin:loggedin,
                          entries:entries,
                          usern:usern});
    });
}

function postEntries(req, res, next) {
  var entrie = "INSERT INTO entries (username, entry, date) VALUES ($1, $2, $3)";
  var info = [req.session.user.username, req.body.textarea, new Date()];
  var clean = xss(req.body.textarea);

  dbUtils.queryDb(entrie, info, function(err) {
    if(err){
      return console.error('error fetching entries from pool', err);
    }
    next();
  });
}


module.exports = router;
