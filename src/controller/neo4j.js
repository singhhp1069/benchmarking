'use strict';
const r = require('request');
const neo4j_transit_Url = 'http://neo4j:password@ec2-35-157-4-148.eu-central-1.compute.amazonaws.com:7474/db/data/transaction/commit';
const neo4j_db_batch = 'http://neo4j:password@ec2-35-157-4-148.eu-central-1.compute.amazonaws.com:7474/db/data/batch';
const fs = require('fs');
const user_name = 'neo4j';
const password = 'password';
const lineReader = require('readline');
const path = require('path');
var converter = require('json-2-csv');



function cypher(url , query, params, cb) {
  r.post(
    {
      uri: url,
      headers: {
        'Authorization': 'Basic '+Buffer(user_name+':'+password).toString('base64'),
        'Content-Type': 'application/json'
      },
      json: { "statements" : [{ "statement": query, "parameters": {"props" : params } } ] }
    },
    (err, res) => {
     cb(err, res);
    }
  );
}
module.exports = {
  name: 'Neo4J',

   createCollection : function (collection_name , callback){

   cypher(neo4j_transit_Url,'CREATE (n:'+collection_name+')','', function(err , result){
            if(result){
              callback({message:'created'});
            }else{
              callback({message:'error'});
            }
    });
   },

  saveCategories : function ( collection, file_categories_content , callback){
      const query='WITH {props} AS document UNWIND document.categories AS category UNWIND category.sub_categories AS subCategory MERGE (c:CrimeCategory {name: category.name}) MERGE (sc:SubCategory {code: subCategory.code}) ON CREATE SET sc.description = subCategory.description MERGE (c)-[:CHILD]->(sc)';
       cypher(neo4j_transit_Url,query, file_categories_content , function(err ,result){
                      if(result){
                        callback({message:'created'});
                      }else{
                        callback({message:'error'});
                      }
      });
  },


  deleteDocument : function (collection_name ,key , callback){
     cypher(neo4j_transit_Url,'MATCH (f) DETACH DELETE f','', function(err ,result){
                    if(result){
                        callback({message:'created'});
                      }else{
                        callback({message:'error'});
                      }
    });
  },

  fetchAllDocument : function(callback){
      cypher(neo4j_transit_Url,'MATCH (f) RETURN f','', function(err ,result){
                    if(result){
                        callback({message:'created'});
                      }else{
                        callback({message:'error'});
                      }
    });

  },

  saveDocument : function (collection_name , doc_array , callback){
    const query="WITH {props} as data MATCH (sc:SubCategory) WHERE sc.code = {props}.FBI_Code CREATE (c:Crime {props} ), (c)-[r:IS_A]->(sc) RETURN c, r";
    var lr = lineReader.createInterface({
        input: fs.createReadStream(doc_array, 'utf8')
    });

    lr.on('line', function (line) {
      cypher(neo4j_transit_Url,query, JSON.parse(line), function(err , result){
            if(err){
                callback({message:'error'});  
            }
                                
          })
    });
      callback({message:'created'});
  },

  bulkImport : function (collection_name ,bulk, doc_array , callback){
        var bulkdata = fs.readFileSync(doc_array, "utf8").toString().trim().split('\n');
        bulkdata = '['+bulkdata+']';

        var data = JSON.parse(bulkdata);
        for(var i = 0; i < data.length; i++) {
          var tmp = bulk.addNode(data[i]);
          bulk.addLabel('Crime',tmp);
        }
        var batchObject = bulk.generateBatch();
       r.post(
          {
            uri: neo4j_db_batch,
            headers: {
              'Authorization': 'Basic '+Buffer(user_name+':'+password).toString('base64'),
              'Content-Type': 'application/json'
            },
            json: batchObject
          },
          (err, res) => {

                 if(res){
                        callback({message:'created'});
                      }else{
                        callback({message:'error'});
                      }
          }
        );

    
  },

  deleteAllDocuments : function(collection_name , callback){
    cypher(neo4j_transit_Url,'MATCH (f) DETACH DELETE f','', function(err ,result){
                    if(result){
                        callback({message:'created'});
                      }else{
                        callback({message:'error'});
                      }
    });
  }
};