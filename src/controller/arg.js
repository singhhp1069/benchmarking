const Database = require('arangojs').Database;
const db = new Database('http://ec2-18-196-148-149.eu-central-1.compute.amazonaws.com:8529');
db.useBasicAuth("root", "password");
module.exports = {

	name : 'arangoDB',
	
  	createDB: function(db_name,callback){
  		db.createDatabase(db_name, function (err) {
				  if (!err) {
				  		callback({message:'created'});
				  		db.useDatabase(db_name);
				  }
				  else {
				  		callback({message:'error'});
				  }
				});
  	},

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

//    doc = {
//   _key: 'firstDocument',
//   a: 'foo',
//   b: 'bar',
//   c: Date()
// };
 

	saveDocument : function (collection_name , doc , callback){

		db.collection(collection_name).save(doc,function(err){
			  				console.log("err"+err);
			if(!err){
				callback({message:'created'});
			}else{
				callback({message:'error'});
			}
		});
	},

	updateDocument : function (collection_name ,key, doc , callback){

		db.collection(collection_name).update(key , doc,function(err){
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

	bulkImport : function (collection_name , doc_array , callback){
		db.collection(collection_name).import(doc_array,function(err){
			  				console.log("err"+err);
			if(!err){
				callback({message:'created'});
			}else{
				callback({message:'error'});
			}
		});
	},

	deleteAllDocument : function(collection_name , callback){
			db.collection(collection_name).all(function(err){
				  				console.log("err"+err);
				if(!err){
					callback({message:'created'});
				}else{
					callback({message:'error'})
				}

			});
	}
};