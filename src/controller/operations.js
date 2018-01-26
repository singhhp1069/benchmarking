var ids = require('../data/ids100000');
var bodies = require('../data/bodies100000');
var paths = require('../data/shortest');
var debug = false;
var underscore = require('underscore');
var async = require('async');
var csv = require('../controller/csv');


function reportResult(db, name, num, duration) {
  console.log('INFO -----------------------------------------------------------------------------');
  console.log('INFO %s: %s, %d items', db, name, num);
  console.log('INFO Total Time for %d requests: %d ms', num, duration);
  console.log('INFO Average: %d ms', (duration / num));
  console.log('INFO -----------------------------------------------------------------------------');
 // csv.generateCSV( {db,name,num});
}

module.exports={

bulkUploading : function(desc ,collection, data , resolve, reject){
   var start = Date.now();
   var goal = data.length;

      desc.createCollection('teskjwwt2',function(result){
        if(result.message=='created'){
          reportResult(desc.name, 'collection creation', 1, Date.now() - start);
        }
      });
      start = Date.now();
      desc.bulkImport('test' ,data,function(result){
        if(result.message=='created'){
                  reportResult(desc.name, 'bulk uploading', goal, Date.now() - start);
        }
      });
  }
}