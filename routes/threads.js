'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var loggedin = true;
var xss = require('xss');

router.get('/', ensureLoggedIn, getThreads);
router.post('/');

function ensureLoggedIn(req, res, next){
    if(req.session.user){
    next();
    }
    else{
      res.redirect('/login');
    }
}

function getThreads(req, res) {
    var threadlist = "select * FROM threads";

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

module.exports = router;
