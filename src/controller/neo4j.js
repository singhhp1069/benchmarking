'use strict';

var opts = {maxSockets: 25};
var Agent = require('http').Agent;
var Neo4j = require('neo4j');
 var db = new Neo4j.GraphDatabase({
      url: 'http://neo4j:password@ec2-52-59-147-76.eu-central-1.compute.amazonaws.com:7474',
      agent: new Agent(opts)
    });

module.exports = {
  name: 'Neo4J',
  db : db,
  CONCURRENCY: 32,

  startup: function (cb) {
    cb(db);
  },

 warmup: function (cb) {
    db.cypher({query: 'MATCH (:PROFILES)--() return count(*) as count'},
      function (err, result) {
        if (err) return cb(err);

        console.log('INFO warmup done, relationships ' + result.count);

        cb(null);
      }
    );
  }
};