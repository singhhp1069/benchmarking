var express = require('express');
var app = express();
var arangodb = require('../controller/arg');
var neo4j = require('../controller/neo4j');
var operations = require('../controller/operations');
var testRuns = [];
var process_tick = -1;
var rendergraph= require('../controller/rendergraph');
const path = require('path');
const fs = require('fs');

app.get('/',function(req,res){
	rendergraph.resetgraphdata();
	testRuns = [];
	process_tick = -1;
	//ArangoCombined
	testRuns.push(function (resolve, reject) { operations.createCollection(arangodb,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.saveCategories(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.saveDocument(arangodb,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.fetchDocuments(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.bulkImport(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.deleteAllDocuments(arangodb,resolve, reject); });
	
	//Neo4JCombined
	testRuns.push(function (resolve, reject) { operations.createCollection(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.saveCategories(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.saveDocument(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.fetchDocuments(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.bulkImport(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.deleteAllDocuments(neo4j,resolve, reject); });


	testRuns.push(function (resolve, reject) {
		 	 rendergraph.getgraphdata(function(result){
				rendergraph.getHTMLCombined('ArangoDB VS Neo4j Report',1,result,function(response){
					fs.writeFile(path.join(__dirname,"../public/index.html"), response, function(err) {
						    if(err) {
						        return console.log(err);
						    }
						     res.sendFile(path.join(__dirname, "../public/index.html"));
						}); 	
					});
				});
			 });
	executeTest();	
	
});


app.get('/throughput',function(req,res){
	rendergraph.resetgraphdata();
	testRuns = [];
	process_tick = -1;
	//ArangoCombined
	testRuns.push(function (resolve, reject) { operations.createCollection(arangodb,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.saveCategories(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.saveDocument(arangodb,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.fetchDocuments(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.bulkImport(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.deleteAllDocuments(arangodb,resolve, reject); });
	
	//Neo4JCombined
	testRuns.push(function (resolve, reject) { operations.createCollection(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.saveCategories(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.saveDocument(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.fetchDocuments(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.bulkImport(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.deleteAllDocuments(neo4j,resolve, reject); });


	testRuns.push(function (resolve, reject) {
		 	 rendergraph.getgraphdata(function(result){
				rendergraph.getHTMLCombined('ArangoDB VS Neo4j Report',0,result,function(response){
					fs.writeFile(path.join(__dirname,"../public/index.html"), response, function(err) {
						    if(err) {
						        return console.log(err);
						    }
						     res.sendFile(path.join(__dirname, "../public/index.html"));
						}); 	
					});
				});
			 });
	executeTest();	
	
});

app.get('/arangodb',function(req,res){
	rendergraph.resetgraphdata();
	testRuns = [];
	process_tick = -1;
	testRuns.push(function (resolve, reject) { operations.createCollection(arangodb,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.saveCategories(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.saveDocument(arangodb,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.fetchDocuments(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.bulkImport(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.deleteAllDocuments(arangodb,resolve, reject); });
	testRuns.push(function (resolve, reject) {
		 	 rendergraph.getgraphdata(function(result){
				rendergraph.getHTML('ArangoDB Report',1,result,function(response){
					fs.writeFile(path.join(__dirname,"../public/index.html"), response, function(err) {
						    if(err) {
						        return console.log(err);
						    }
						     res.sendFile(path.join(__dirname, "../public/index.html"));
						}); 	
					});
				});
			 });
	executeTest();	

	
});


app.get('/arangodb/throughput',function(req,res){
	rendergraph.resetgraphdata();
	testRuns = [];
	process_tick = -1;
	testRuns.push(function (resolve, reject) { operations.createCollection(arangodb,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.saveCategories(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.saveDocument(arangodb,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.fetchDocuments(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.bulkImport(arangodb,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.deleteAllDocuments(arangodb,resolve, reject); });
	testRuns.push(function (resolve, reject) {
		 	 rendergraph.getgraphdata(function(result){
				rendergraph.getHTML('ArangoDB Report',0,result,function(response){
					fs.writeFile(path.join(__dirname,"../public/index.html"), response, function(err) {
						    if(err) {
						        return console.log(err);
						    }
						     res.sendFile(path.join(__dirname, "../public/index.html"));
						}); 	
					});
				});
			 });
	executeTest();	
	
});

app.get('/neo4j',function(req,res){
	rendergraph.resetgraphdata();
	testRuns = [];
	process_tick = -1;
	testRuns.push(function (resolve, reject) { operations.createCollection(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.saveCategories(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.saveDocument(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.fetchDocuments(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.bulkImport(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.deleteAllDocuments(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) {
		 	 rendergraph.getgraphdata(function(result){
				rendergraph.getHTML('Neo4j Report',1,result,function(response){
					fs.writeFile(path.join(__dirname,"../public/index.html"), response, function(err) {
						    if(err) {
						        return console.log(err);
						    }
						     res.sendFile(path.join(__dirname, "../public/index.html"));
						}); 	
					});
				});
			 });
	executeTest();	
});

app.get('/neo4j/throughput',function(req,res){
	rendergraph.resetgraphdata();
	testRuns = [];
	process_tick = -1;
	testRuns.push(function (resolve, reject) { operations.createCollection(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.saveCategories(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.saveDocument(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) { operations.fetchDocuments(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.bulkImport(neo4j,resolve, reject); });	
	testRuns.push(function (resolve, reject) { operations.deleteAllDocuments(neo4j,resolve, reject); });
	testRuns.push(function (resolve, reject) {
		 	 rendergraph.getgraphdata(function(result){
				rendergraph.getHTML('Neo4j Report',0,result,function(response){
					fs.writeFile(path.join(__dirname,"../public/index.html"), response, function(err) {
						    if(err) {
						        return console.log(err);
						    }
						     res.sendFile(path.join(__dirname, "../public/index.html"));
						}); 	
					});
				});
			 });
	executeTest();	
});


function reportError(err) {
  console.log('ERROR %s', err);
  process.exit(0);
}

function executeTest() {
		  testRuns[++process_tick]( function () {
					process.nextTick(executeTest);
		}, reportError);
}

module.exports = app;