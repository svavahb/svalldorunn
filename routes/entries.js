'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var threadId;

router.get('/:id', ensureLoggedIn, getRender);
router.post('/:id', postEntries, postRender);
router.delete('/:id', deleteEntry, getRender);

function ensureLoggedIn(req, res, next){
    if(req.session.user){
    next();
    }
    else{
      res.redirect('/login');
    }
}

function getRender(req, res) {
  var login = 'SELECT * FROM entries, users WHERE entries.threadid=$1 AND users.username=entries.username ORDER BY date ASC';
  var threadName = 'SELECT * FROM threads WHERE id=$1';
  var par = [req.params.id];
  console.log('id: '+req.params.id);

  dbUtils.queryDb(threadName, par, function(err, results) {
    if(err) {
      res.render('login', {loggedin:loggedin});
      return console.error('error fetching client from pool', err);
    }
    var renderThreads = results.rows[0];

    console.log(req.session);
    threadId = req.params.id;
    console.log('get: '+threadId);

    dbUtils.queryDb(login, par, function(err,result) {
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
                            threadId:threadId,
                            renderThreads:renderThreads});
      });
  });
}

function postRender(req, res) {
  var login = 'select * FROM entries, users WHERE entries.threadid=$1 AND users.username=entries.username ORDER BY date ASC';
  console.log(req.session);
  var parameters = [req.params.id];

  var threadName = 'SELECT * FROM threads WHERE id=$1';
  var par = [req.params.id];
  console.log('id: '+req.params.id);

  dbUtils.queryDb(threadName, par, function(err, results) {
    if(err) {
      res.render('login', {loggedin:loggedin});
      return console.error('error fetching client from pool', err);
    }
    var renderThreads = results.rows[0];

    console.log(req.session);
    threadId = req.params.id;
    console.log('post: '+threadId);

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
                            threadId:threadId,
                            renderThreads:renderThreads});
      });
  });
}

function postEntries(req, res, next) {
  var entry = 'INSERT INTO entries (username, entry, date, threadid) VALUES ($1, $2, $3, $4)';
  var info = [req.session.user.username, req.body.textarea, new Date(),
              threadId];

  dbUtils.queryDb(entry, info, function(err) {
    if(err){
      return console.error('error fetching entries from pool', err);
    }
    next();
  });
}

function deleteEntry(req, res, next) {
  var querystr = 'DELETE FROM entries WHERE id=$1';
  var parameter= [req.body.entryid];

  console.log('delete');

  dbUtils.queryDb(querystr, parameter, function(err) {
    if(err){
      return console.error('error fetching entries from pool', err);
    }
    next();
  });
}

module.exports = router;
