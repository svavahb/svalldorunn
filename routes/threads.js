'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var xss = require('xss');

router.get('/', ensureLoggedIn, getThreads);
router.post('/', newThread, getThreads);

function ensureLoggedIn(req, res, next){
    if(req.session.user){
    next();
    }
    else{
      res.redirect('/login');
    }
}

function getThreads(req, res) {
    var threadlist = "select * FROM threads ORDER BY date DESC";

    dbUtils.queryDb(threadlist, null, function(err,result) {
      if(err) {
        res.render('login', {loggedin:loggedin});
        return console.error('error fetching client from pool', err);
      }
      var threads = result;
      var usern = req.session.user.username;


    res.render('threads', {session : req.session,
                          loggedin:loggedin,
                          threads:threads,
                          usern:usern});
    });
}

function newThread(req, res, next) {
  var entry = "INSERT INTO threads (threadname, username, date, category) VALUES ($1, $2, $3, $4)";
  var info = [req.body.threadTitle, req.session.user.username, new Date(), req.body.category];
  var clean = xss(req.body.textarea);

  dbUtils.queryDb(entry, info, function(err) {
    if(err){
      return console.error('error fetching entries from pool', err);
    }
    var querystr = "SELECT * FROM threads WHERE threadname=$1";
    var parameter = [req.body.threadTitle];
    dbUtils.queryDb(querystr, parameter, function(err, results) {
      if(err){
        return console.error('error fetching entries from pool', err);
      }
      var threadid = results.rows[0].id;
      querystr = "INSERT INTO entries (username, entry, date, threadid) VALUES ($1, $2, $3, $4)";
      var parameters = [req.session.user.username, req.body.textarea, new Date(), threadid];
      dbUtils.queryDb(querystr, parameters, function(err) {
        if(err){
          return console.error('error fetching entries from pool', err);
        }
        res.redirect('/entries/'+threadid);
      });
    });
  });
}

module.exports = router;
