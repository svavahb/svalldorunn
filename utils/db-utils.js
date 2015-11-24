'use strict';

var pg = require('pg');
//var database = 'postgres://mfjipppstqpouz:aA2AfuGMungbamweau7SCtwcjM@ec2-54-217-240-205.eu-west-1.compute.amazonaws.com:5432/de06nqtrlg1lkt';
var database = 'postgres://postgres:thorunn@localhost/svalldorunn';
//var DATABASE = process.env.DATABASE_URL;

exports.queryDb = function(queryStr, parameters, then) {
  pg.connect(database, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(queryStr, parameters, function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) {
        return then(err, null);
      }
      then(null, result);
    });
  });
};
