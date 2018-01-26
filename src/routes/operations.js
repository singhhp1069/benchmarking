var express = require('express');
var app = express();
var arangodb = require('../controller/arg');
// var neo4j = require('./neo4j');
var operations = require('../controller/operations');
var randomstring = require("randomstring");
var testRuns = [];
var randomDB= randomstring.generate();
var posTests = -1;


// arangodb.createDB(randomDB,function(res){
// 	console.log("new db : "+randomDB + " :is "+JSON.stringify(res));
// });

app.get('/generate',function(req,res){
	
});



var collection = 'route';

var bulkdata = [{_key: 'firstDocument',a: 'foo111',b: 'bar111',c: Date()},
				{_key: 'firstDocument1',a: 'foo111',b: 'bar111',c: Date()},
				{_key: 'firstDocument2',a: 'foo111',b: 'bar111',c: Date()},
				{_key: 'firstDocument3',a: 'foo111',b: 'bar111',c: Date()},
				{_key: 'firstDocument4',a: 'foo111',b: 'bar111',c: Date()},
				,{_key: 'firstDocument5',a: 'foo111',b: 'bar111',c: Date()}];


app.get('/bulkUploading',function(req,res){
	testRuns = [];
	posTests = -1;
	testRuns.push(function (resolve, reject) { operations.bulkUploading(arangodb, collection,bulkdata, resolve, reject); });
	executeTest();
});


function reportError(err) {
  console.log('ERROR %s', err);
  process.exit(0);
}

function executeTest() {
  testRuns[++posTests](function () {
    process.nextTick(executeTest);
  }, reportError);
}


// app.use('/arangodb',arangodb);
// app.use('/neo4j',neo4j);

module.exports = app;