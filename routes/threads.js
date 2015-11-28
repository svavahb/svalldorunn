'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var threadnameerror = false;
var nothreadname = false;

router.get('/', ensureLoggedIn, getThreads);
router.post('/', newThread, getThreads);
router.post('/delete', deleteThread, getThreads);

function ensureLoggedIn(req, res, next){
    if(req.session.user){
    next();
    }
    else{
      res.redirect('/login');
    }
}

function getThreads(req, res) {
    var threadlist = 'select * FROM threads ORDER BY date DESC';

    dbUtils.queryDb(threadlist, null, function(err,result) {
      if(err) {
        res.render('login', {title: 'BíóSpjallið',
                            loggedin:loggedin});
        return console.error('error fetching client from pool', err);
      }
      var threads = result;
      var usern = req.session.user.username;


    res.render('threads', {title: 'BíóSpjallið',
                          session : req.session,
                          loggedin:loggedin,
                          threads:threads,
                          usern:usern,
                          threadnameerror:threadnameerror,
                          nothreadname:nothreadname});
    });
}

function newThread(req, res, next) {
  var entry = 'INSERT INTO threads (threadname, username, date, category)' +
    ' VALUES ($1, $2, $3, $4)';
  var info = [req.body.threadTitle, req.session.user.username, new Date(),
              req.body.category];

  if(req.body.threadTitle==='') {
    nothreadname = true;
    threadnameerror = false;
    return next();
  }
  dbUtils.queryDb(entry, info, function(err) {
    if(err){
      if((/.*(threads_threadname_key).*/).test(err)) {
        threadnameerror = true;
        nothreadname = false;
        return next();
      }
      else {
        return console.error('error fetching entries from pool', err);
      }
    }
    var querystr = 'SELECT * FROM threads WHERE threadname=$1';
    var parameter = [req.body.threadTitle];
    dbUtils.queryDb(querystr, parameter, function(err, results) {
      if(err){
        return console.error('error fetching entries from pool', err);
      }
      var threadid = results.rows[0].id;
      querystr = 'INSERT INTO entries (username, entry, date, threadid)' +
        ' VALUES ($1, $2, $3, $4)';
      var parameters = [req.session.user.username, req.body.textarea,
                        new Date(), threadid];
      dbUtils.queryDb(querystr, parameters, function(err) {
        if(err){
          return console.error('error fetching entries from pool', err);
        }
        res.redirect('/entries/'+threadid);
      });
    });
  });
}

function deleteThread(req, res, next) {
  var querys = 'DELETE FROM entries WHERE threadid=$1';
  var par = [req.body.threadid];

  dbUtils.queryDb(querys, par, function(err) {
    if(err){
      return console.error('error fetching entries from pool', err);
    }
    querys = 'DELETE FROM threads WHERE id=$1';

    dbUtils.queryDb(querys, par, function(err) {
      if(err){
        return console.error('error fetching entries from pool', err);
      }
      return next();
    });
  });
}

module.exports = router;
