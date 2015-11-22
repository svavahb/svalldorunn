'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var xss = require('xss');

router.get('/:id', ensureLoggedIn, prufurender);
router.post('/',postEntries, prufurender);

function ensureLoggedIn(req, res, next){
    if(req.session.user){
    next();
    }
    else{
      res.redirect('/login');
    }
}

function prufurender(req, res) {
    var login = "select * FROM entries WHERE threadid=$1 ORDER BY date DESC LIMIT 20";
    console.log(req.session);
    console.log(req.params.id);
    var parameters = [req.params.id];
    var createThread;

    dbUtils.queryDb(login, parameters, function(err,result) {
      if(err) {
        res.render('login', {loggedin:loggedin});
        return console.error('error fetching client from pool', err);
      }
      var entries = result;
      var imageset;
      var usern = req.session.user.username;

      if(req.session.user.image===null) {
        imageset=false;
      }
      else {
        imageset=true;
      }

    res.render('entries', {session : req.session,
                          loggedin:loggedin,
                          entries:entries,
                          usern:usern,
                          imageset:imageset});
    });
}

function postEntries(req, res, next) {
  var entrie = "INSERT INTO entries (username, entry, date, threadid) VALUES ($1, $2, $3, $4)";
  var info = [req.session.user.username, req.body.textarea, new Date(), req.params.id];
  var clean = xss(req.body.textarea);

  dbUtils.queryDb(entrie, info, function(err) {
    if(err){
      return console.error('error fetching entries from pool', err);
    }
    next();
  });
}


module.exports = router;
