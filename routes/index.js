'use strict';

var express = require('express');
var router = express.Router();
var loggedin = false;
var usern;

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session);
  console.log(req.session.user);
  if(req.session && req.session.user) {
       console.info(req.session.user);
       loggedin = true;
       usern = req.session.user.username;
  }
  console.log(loggedin);
  res.render('index', {title: 'BíóSpjallið',
                       session : req.session,
                       usern:usern,
                       loggedin:loggedin });
});


module.exports = router;
