'use strict';

var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

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
