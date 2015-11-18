'use strict';

var express = require('express');
var router = express.Router();
var loggedin = false;


/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session);
  res.render('index', {session : req.session, loggedin:loggedin });
});


module.exports = router;
