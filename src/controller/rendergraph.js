var graph_data = [];
var script = '';
var div = '';
var data = '';
var  HTML = '';

module.exports = {

	getHTML : function(title,type,result,callback){
	script = '';
	div = '';
	data = '';
	  for (var i = 0 ; i <result.length; i++) {
	  	  var call_type = '';
          if(type==0){call_type =result[i].Average_time; }else{call_type=result[i].totaltime; }

	  	  script = script + 'var data = [["",0, '+call_type+']];'+
							'		 var chart = anychart.bar();'+
							'		 chart.xAxis().title("'+result[i].iterations+ ' Number of Iteration ");'+
							'		 chart.yAxis().title("Time , MilliSecond");'+
							'		 chart.rangeBar(data);'+
							'		 chart.title("'+result[i].operation_name+'");'+
							'		 chart.container("'+result[i].operation_name+'");'+
							'		 chart.draw();';

	 	  div = div+' <div>'+'<div align="center" id="'+result[i].operation_name+'" style="width: 700px; height: 300px;"></div></div>';
	  

	  }
	
    HTML = '<!doctype html>'+
				'<head>'+
				'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" crossorigin="anonymous">'+
				'<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossorigin="anonymous"></script>'+
				'<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" crossorigin="anonymous"></script>'+
				'<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"  crossorigin="anonymous"></script>'+
				'<script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-base.min.js" type="text/javascript"></script>'+
				'</head>'+
				'<body>'+
				'	<h1 align="center" >'+title+'</h1>'+
				'<script>'+
				'   anychart.onDocumentReady(function() {'+script+'});'+
				'</script> '+
				'<div class="container">'+ div +'</div>'+
				'</body>'+
				'</html>';

	callback(HTML);
	},

	getHTMLCombined : function(title,type,result,callback){
		script = '';
		div = '';
		data = '';
		var collection_creation = [];
		var save_categories = [];
		var save_documents = [];
		var fetch_data = [];
		var bulk_import = [];
		var delete_document = [];
		for (var i = 0 ; i <result.length; i++) {
			if(result[i].operation_name =="Collection Creation"){
				collection_creation.push({"operation":result[i].operation_name,"db":result[i].dbname,"Average_time":result[i].Average_time,"totaltime":result[i].totaltime ,"iterations":result[i].iterations});
			}else if(result[i].operation_name =="Save Categories"){
				save_categories.push({"operation":result[i].operation_name,"db":result[i].dbname,"Average_time":result[i].Average_time,"totaltime":result[i].totaltime ,"iterations":result[i].iterations});
			}else if(result[i].operation_name =="Save Documents"){
				save_documents.push({"operation":result[i].operation_name,"db":result[i].dbname,"Average_time":result[i].Average_time,"totaltime":result[i].totaltime ,"iterations":result[i].iterations});
			}else if(result[i].operation_name =="Fetch Data"){
				fetch_data.push({"operation":result[i].operation_name,"db":result[i].dbname,"Average_time":result[i].Average_time,"totaltime":result[i].totaltime ,"iterations":result[i].iterations});
			}else if(result[i].operation_name =="Bulk Imports"){
				bulk_import.push({"operation":result[i].operation_name,"db":result[i].dbname,"Average_time":result[i].Average_time,"totaltime":result[i].totaltime ,"iterations":result[i].iterations});
			}else if(result[i].operation_name =="Delete Documents"){
				delete_document.push({"operation":result[i].operation_name,"db":result[i].dbname,"Average_time":result[i].Average_time,"totaltime":result[i].totaltime ,"iterations":result[i].iterations});
			}
		}
      console.log("collection_creation"+JSON.stringify(collection_creation));
          if(collection_creation.length>0){
          	var param1 = '';
          	var param2 = '';
           if(type==0){param1 =collection_creation[0].Average_time;param2 =collection_creation[1].Average_time; }else{param1 =collection_creation[0].totaltime;param2 =collection_creation[1].totaltime; }
   	  	  script = script + 'var data = [["'+collection_creation[0].db+'",0, '+param1+'],["'+collection_creation[1].db+'",0, '+param2+']];'+
							'		 var chart = anychart.bar();'+
							'		 chart.xAxis().title("'+collection_creation[0].iterations+ ' Number of Iteration ");'+
							'		 chart.yAxis().title("Time , MilliSecond");'+
							'		 chart.rangeBar(data);'+
							'		 chart.title("'+collection_creation[0].operation+'");'+
							'		 chart.container("'+collection_creation[0].operation+'");'+
							'		 chart.draw();';

	 					  div = div+' <div>'+'<div align="center" id="'+collection_creation[0].operation+'" style="width: 700px; height: 300px;"></div></div>';
          }

          if(save_categories.length>0){
          	var param1 = '';
          	var param2 = '';
           if(type==0){param1 =save_categories[0].Average_time;param2 =save_categories[1].Average_time; }else{param1 =save_categories[0].totaltime;param2 =save_categories[1].totaltime; }

          	script = script + 'var data = [["'+save_categories[0].db+'",0, '+param1+'],["'+save_categories[1].db+'",0, '+param2+']];'+
							'		 var chart = anychart.bar();'+
							'		 chart.xAxis().title("'+save_categories[0].iterations+ ' Number of Iteration ");'+
							'		 chart.yAxis().title("Time , MilliSecond");'+
							'		 chart.rangeBar(data);'+
							'		 chart.title("'+save_categories[0].operation+'");'+
							'		 chart.container("'+save_categories[0].operation+'");'+
							'		 chart.draw();';

	 					  div = div+' <div>'+'<div align="center" id="'+save_categories[0].operation+'" style="width: 700px; height: 300px;"></div></div>';
          }
           if(save_documents.length>0){
           	var param1 = '';
          	var param2 = '';
           if(type==0){param1 =save_documents[0].Average_time;param2 =save_documents[1].Average_time; }else{param1 =save_documents[0].totaltime;param2 =save_documents[1].totaltime; }

          	script = script + 'var data = [["'+save_documents[0].db+'",0, '+param1+'],["'+save_documents[1].db+'",0, '+param2+']];'+
							'		 var chart = anychart.bar();'+
							'		 chart.xAxis().title("'+save_documents[0].iterations+ ' Number of Iteration ");'+
							'		 chart.yAxis().title("Time , MilliSecond");'+
							'		 chart.rangeBar(data);'+
							'		 chart.title("'+save_documents[0].operation+'");'+
							'		 chart.container("'+save_documents[0].operation+'");'+
							'		 chart.draw();';

	 					  div = div+' <div>'+'<div align="center" id="'+save_documents[0].operation+'" style="width: 700px; height: 300px;"></div></div>';
          }
           if(fetch_data.length>0){
           	var param1 = '';
          	var param2 = '';
           if(type==0){param1 =fetch_data[0].Average_time;param2 =fetch_data[1].Average_time; }else{param1 =fetch_data[0].totaltime;param2 =fetch_data[1].totaltime; }
  
          	script = script + 'var data = [["'+fetch_data[0].db+'",0, '+param1+'],["'+fetch_data[1].db+'",0, '+param2+']];'+
							'		 var chart = anychart.bar();'+
							'		 chart.xAxis().title("'+fetch_data[0].iterations+ ' Number of Iteration ");'+
							'		 chart.yAxis().title("Time , MilliSecond");'+
							'		 chart.rangeBar(data);'+
							'		 chart.title("'+fetch_data[0].operation+'");'+
							'		 chart.container("'+fetch_data[0].operation+'");'+
							'		 chart.draw();';

	 					  div = div+' <div>'+'<div align="center" id="'+fetch_data[0].operation+'" style="width: 700px; height: 300px;"></div></div>';
          }

           if(bulk_import.length>0){
           	           	var param1 = '';
          	var param2 = '';
           if(type==0){param1 =bulk_import[0].Average_time;param2 =bulk_import[1].Average_time; }else{param1 =bulk_import[0].totaltime;param2 =bulk_import[1].totaltime; }

          	script = script + 'var data = [["'+bulk_import[0].db+'",0, '+param1+'],["'+bulk_import[1].db+'",0, '+param2+']];'+
							'		 var chart = anychart.bar();'+
							'		 chart.xAxis().title("'+bulk_import[0].iterations+ ' Number of Iteration ");'+
							'		 chart.yAxis().title("Time , MilliSecond");'+
							'		 chart.rangeBar(data);'+
							'		 chart.title("'+bulk_import[0].operation+'");'+
							'		 chart.container("'+bulk_import[0].operation+'");'+
							'		 chart.draw();';

	 					  div = div+' <div>'+'<div align="center" id="'+bulk_import[0].operation+'" style="width: 700px; height: 300px;"></div></div>';
          }

           if(delete_document.length>0){
           	           	var param1 = '';
          	var param2 = '';
           if(type==0){param1 =delete_document[0].Average_time;param2 =delete_document[1].Average_time; }else{param1 =delete_document[0].totaltime;param2 =delete_document[1].totaltime; }

          	script = script + 'var data = [["'+delete_document[0].db+'",0, '+param1+'],["'+delete_document[1].db+'",0, '+param2+']];'+
							'		 var chart = anychart.bar();'+
							'		 chart.xAxis().title("'+delete_document[0].iterations+ ' Number of Iteration ");'+
							'		 chart.yAxis().title("Time , MilliSecond");'+
							'		 chart.rangeBar(data);'+
							'		 chart.title("'+delete_document[0].operation+'");'+
							'		 chart.container("'+delete_document[0].operation+'");'+
							'		 chart.draw();';

	 					  div = div+' <div>'+'<div align="center" id="'+delete_document[0].operation+'" style="width: 700px; height: 300px;"></div></div>';
          }


    HTML = '<!doctype html>'+
				'<head>'+
				'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" crossorigin="anonymous">'+
				'<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossorigin="anonymous"></script>'+
				'<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" crossorigin="anonymous"></script>'+
				'<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"  crossorigin="anonymous"></script>'+
				'<script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-base.min.js" type="text/javascript"></script>'+
				'</head>'+
				'<body>'+
				'	<h1 align="center" >'+title+'</h1>'+
				'<script>'+
				'   anychart.onDocumentReady(function() {'+script+'});'+
				'</script> '+
				'<div class="container">'+ div +'</div>'+
				'</body>'+
				'</html>';

	callback(HTML);
	},

	setgraphdata : function(data){
		graph_data.push(data);
	},

	resetgraphdata : function(){
		graph_data = [];
		script = '';
		div = '';
		data = '';
		HTML = '';
	},

	getgraphdata : function(callback){
		callback(graph_data);
	}
}