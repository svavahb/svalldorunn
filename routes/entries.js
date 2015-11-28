'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var threadId;

router.get('/:id', ensureLoggedIn, entryRender);
router.post('/:id', postEntries, entryRender);
router.post('/delete/:id', deleteEntry, entryRender);

function ensureLoggedIn(req, res, next){
    if(req.session.user){
    next();
    }
    else{
      res.redirect('/login');
    }
}

function entryRender(req, res) {
  console.log('getRender');
  var login = 'SELECT *, entries.id AS entryid FROM entries, users WHERE' +
  ' entries.threadid=$1 AND users.username=entries.username ORDER BY date ASC';
  var threadName = 'SELECT * FROM threads WHERE id=$1';
  var par = [req.params.id];

  dbUtils.queryDb(threadName, par, function(err, results) {
    if(err) {
      res.render('login', {title: 'BíóSpjallið',
                          loggedin:loggedin});
      return console.error('error fetching client from pool', err);
    }
    var renderThreads = results.rows[0];

    console.log(req.session);
    threadId = req.params.id;

    dbUtils.queryDb(login, par, function(err,result) {
      if(err) {
        res.render('login', {title: 'BíóSpjallið',
                            loggedin:loggedin});
        return console.error('error fetching client from pool', err);
      }
      var entries = result;
      var usern = req.session.user.username;

      res.render('entries', {title: 'BíóSpjallið',
                            session : req.session,
                            loggedin:loggedin,
                            entries:entries,
                            usern:usern,
                            threadId:threadId,
                            renderThreads:renderThreads});
      });
  });
}

function postEntries(req, res, next) {
  var entry = 'INSERT INTO entries (username, entry, date, threadid)' +
   ' VALUES ($1, $2, $3, $4)';
  var info = [req.session.user.username, req.body.textarea, new Date(),
              req.params.id];

  dbUtils.queryDb(entry, info, function(err) {
    if(err){
      return console.error('error fetching entries from pool', err);
    }
    return next();
  });
}

function deleteEntry(req, res, next) {
  var querystr = 'DELETE FROM entries WHERE id=$1';
  var parameter= [req.body.entryid];

  dbUtils.queryDb(querystr, parameter, function(err) {
    if(err){
      return console.error('error fetching entries from pool', err);
    }
    return next();
  });
}

module.exports = router;
