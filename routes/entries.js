'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var xss = require('xss');
var threadId;

router.get('/:id', ensureLoggedIn, getRender);
router.post('/:id', postEntries, postRender); // HALLO HJALP
// http://localhost:8080/entries/:id


function ensureLoggedIn(req, res, next){
    if(req.session.user){
    next();
    }
    else{
      res.redirect('/login');
    }
}

function getRender(req, res) {
  var login = "select * FROM entries WHERE threadid=$1 ORDER BY date DESC LIMIT 20";
  console.log(req.session);
  threadId = req.params.id;
  var parameters = [req.params.id];

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
                          usern:usern,
                        threadId:threadId});
  });
}

function postRender(req, res) {
  var login = "select * FROM entries WHERE threadid=$1 ORDER BY date DESC LIMIT 20";
  console.log(req.session);
  var parameters = [req.params.id];

  dbUtils.queryDb(login, parameters, function(err, result) {
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
  var entry = "INSERT INTO entries (username, entry, date, threadid) VALUES ($1, $2, $3, $4)";
  var info = [req.session.user.username, req.body.textarea, new Date(), threadId];
  var clean = xss(req.body.textarea);

  dbUtils.queryDb(entry, info, function(err) {
    if(err){
      return console.error('error fetching entries from pool', err);
    }
    next();
  });
}


module.exports = router;
