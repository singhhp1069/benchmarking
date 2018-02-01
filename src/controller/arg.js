var randomstring = require("randomstring");
var randomDB= randomstring.generate();
const fs = require('fs');
const Database = require('arangojs').Database;
const db = new Database('http://ec2-18-196-172-248.eu-central-1.compute.amazonaws.com:8529');
db.useBasicAuth("root", "password");
//Random database select when app launch
// for test cases
db.createDatabase(randomDB, function (err) {if (!err) db.useDatabase(randomDB);});	

module.exports = {

   name : 'arangoDB',

   createCollection : function (collection_name , callback){
  			db.collection(collection_name).create(function(err){

  				console.log("err"+err);
   				if(!err){
   					callback({message:'created'});
   				}else{
   					callback({message:'error'});	
   				}
   			});
   },

   saveCategories : function (collection , doc , callback){
    	db.collection(collection).save(doc,function(err){
			 console.log("err"+err);
			if(!err){
				callback({message:'created'});
			}else{
				callback({message:'error'});
			}
		});
  	},

  	 fetchAllDocument : function(callback){
     db.listCollections(function(err){
 			console.log("err"+err);
    			if(!err){
				callback({message:'created'});
			}else{
				callback({message:'error'});
			}
    		});
  },

	saveDocument : function (collection_name , doc , callback){
		var bulkdata = fs.readFileSync(doc, "utf8").toString().trim().split('\n');
		var bulkdata = '['+bulkdata+']';
		db.collection(collection_name).save(bulkdata,{type:'documents'},function(err){
			console.log("err"+err);
								if(!err){
									callback({message:'created'});
								}else{
									callback({message:'error'});
								}
			});			
	},

	deleteDocument : function (collection_name ,key , callback){
	 db.collection(collection_name).remove(key ,function(err){
			  				console.log("err"+err);
			if(!err){
				callback({message:'created'});
			}else{
				callback({message:'error'});
			}
		});

	},

	bulkImport : function (collection_name , batchObject ,doc_array , callback){
		var bulkdata = fs.readFileSync(doc_array, "utf8");
		db.collection(collection_name).import(bulkdata,function(err){
			  				console.log("err"+err);
			if(!err){
				callback({message:'created'});
			}else{
				callback({message:'error'});
			}
		});
	},

	deleteAllDocuments : function(collection_name , callback){
			    db.collection(collection_name).truncate(function(err){
			    			if(!err){
										callback({message:'created'});
									}else{
										callback({message:'error'});
									}
			   			 }
			    	);
	}
};