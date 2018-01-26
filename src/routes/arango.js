const express = require('express');
const app = express.Router();
var arangodb = require('../controller/arg');

app.get('/arangodb/:db_name',function(req,res){
		arangodb.createDB(req.params.db_name,function(result){
			res.json(result);
		});
});

app.get('/creteCollection/:collection_name',function(req,res){
		arangodb.createCollection(req.params.collection_name,function(result){
			res.json(result);
		});

});

var doc = {
  _key: 'firstDocument',
  a: 'foo',
  b: 'bar',
  c: Date()
};

app.get('/saveDocument/:collection_name',function(req,res){
		arangodb.saveDocument(req.params.collection_name,doc,function(result){
			res.json(result);
		});
});

var doc1 = {
  _key: 'firstDocument',
  a: 'foo111',
  b: 'bar111',
  c: Date()
};

app.get('/updateDocument/:collection_name',function(req,res){
		arangodb.updateDocument(req.params.collection_name,'firstDocument',doc1,function(result){
			res.json(result);
		});
});


app.get('/deleteDocument/:collection_name',function(req,res){
		arangodb.deleteDocument(req.params.collection_name,'firstDocument',function(result){
			res.json(result);
		});
});


var bulkdata = [{_key: 'firstDocument',a: 'foo111',b: 'bar111',c: Date()},
				{_key: 'firstDocument1',a: 'foo111',b: 'bar111',c: Date()},
				{_key: 'firstDocument2',a: 'foo111',b: 'bar111',c: Date()},
				{_key: 'firstDocument3',a: 'foo111',b: 'bar111',c: Date()},
				{_key: 'firstDocument4',a: 'foo111',b: 'bar111',c: Date()},
				,{_key: 'firstDocument5',a: 'foo111',b: 'bar111',c: Date()}];

app.get('/bulkImport/:collection_name',function(req,res){
		arangodb.bulkImport(req.params.collection_name,bulkdata,function(result){
			res.json(result);
		});
});

app.get('/deleteAllDocument/:collection_name',function(req,res){
		arangodb.deleteAllDocument(req.params.collection_name,function(result){
			res.json(result);
		});
});

module.exports = app;
