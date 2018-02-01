var debug = false;
var underscore = require('underscore');
var async = require('async');
var csv = require('../controller/csv');
const path = require('path');
const fs = require('fs');
const file_categories = path.join(__dirname, "..", "..","dataset", "categories.json");
const file_categories_content = JSON.parse(fs.readFileSync(file_categories, "utf8"));
const file_data = path.join(__dirname, "..", "..","dataset", "chicago_crime1000.json");
const data_document = path.join(__dirname, "..", "..","dataset", "chicago_crime1.json");
//const file_data = path.join(__dirname, "..", "..","dataset", "chicago_crime25000.json");

var randomstring = require("randomstring");
var collection_name ='';
var Bulk = require('neo4j-bulk');
var bulk = new Bulk();

var graph_data = require('./rendergraph');


function reportResult(db, name, num, duration) {
  console.log('INFO -----------------------------------------------------------------------------');
  console.log('INFO %s: %s, %d items', db, name, num);
  console.log('INFO Total Time for %d requests: %d ms', num, duration);
  console.log('INFO Average: %d ms', (duration / num));
  console.log('INFO -----------------------------------------------------------------------------');
  csv.generateCSV({report:[{ dbname: db, operation_name: name, iterations: num , totaltime: duration, Average_time: (duration/num)}]});
  graph_data.setgraphdata({dbname: db, operation_name: name, iterations: num , totaltime: duration, Average_time: (duration/num)});
}

module.exports={

  createCollection: function(desc , resolve, reject){
   var start = Date.now();
   collection_name = randomstring.generate({length: 20,charset: 'alphabetic'});
   var goal = collection_name.length;
      desc.createCollection(collection_name,function(result){
          console.log("createCollection result"+JSON.stringify(result));
        if(result.message=='created'){
          reportResult(desc.name, 'Collection Creation', goal, Date.now() - start);
         return resolve();
        }else {
          return reject();
        }
      });
  },

  saveCategories : function(desc , resolve, reject){
   var start = Date.now();
   var goal = Object.keys(file_categories).length;
      desc.saveCategories(collection_name,file_categories_content,function(result){
        console.log("saveCategories result"+JSON.stringify(result));
        if(result.message=='created'){
          reportResult(desc.name, 'Save Categories', goal, Date.now() - start);
         return resolve();
        }else {
          return reject();
        }
      });
  },

  saveDocument : function (desc, resolve , reject){
   var start = Date.now();
   var goal = data_document.length;
      desc.saveDocument(collection_name,data_document,function(result){
        console.log("saveDocument result"+JSON.stringify(result));
        if(result.message=='created'){
          reportResult(desc.name, 'Save Documents', goal, Date.now() - start);
         return resolve();
        }else {
         return reject();
        }
      });
  },


  bulkImport : function (desc, resolve , reject){

  var start = Date.now();
     var goal = Object.keys(file_data).length;
     //var goal = 25000;
     desc.bulkImport(collection_name,bulk,file_data,function(result){
      console.log("bulk result"+JSON.stringify(result));
       if(result.message=='created'){
         reportResult(desc.name, 'Bulk Imports', goal, Date.now() - start);
        return resolve();
       }else {
        return reject();
       }
     });
 },

  fetchDocuments :function (desc, resolve , reject){
   var start = Date.now();
     var goal = 1;
      desc.fetchAllDocument(function(result){
         console.log("fetchDocuments result"+JSON.stringify(result));
        if(result.message=='created'){
          reportResult(desc.name, 'Fetch Data', goal, Date.now() - start);
         return resolve();
        }else {
         return reject();
        }
      });
  },

  deleteAllDocuments : function (desc, resolve , reject){
   var start = Date.now();
     var goal = collection_name.length;
      desc.deleteAllDocuments(collection_name,function(result){
           console.log("deleteAllDocuments result"+JSON.stringify(result));
        if(result.message=='created'){
          reportResult(desc.name, 'Delete Documents', goal, Date.now() - start);
         return resolve();
        }else {
         return reject();
        }
      });
  },
}