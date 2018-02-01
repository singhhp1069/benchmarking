var csv_export=require('csv-export');
var fs = require('fs');
const path = require('path');
const path_csv = path.join(__dirname, "../reports");
module.exports = {
	generateCSV : function (data ){
  		csv_export.export(data,function(buffer){
       fs.writeFileSync(path_csv+'/'+data.report[0].dbname+'_'+data.report[0].operation_name+'.zip',buffer);
        });
    }
}
 
