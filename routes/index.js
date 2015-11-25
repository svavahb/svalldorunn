'use strict';

var express = require('express');
var router = express.Router();
var loggedin = false;


/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session);
  if(req.session && req.session.user) {
       console.info(req.session.user);
       loggedin = true;
       var usern = req.session.user.username;
  }
  console.log(loggedin);
  res.render('index', {session : req.session, usern:usern, loggedin:loggedin });
});


module.exports = router;
