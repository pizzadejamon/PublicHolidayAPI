//logs metadata & request data to MySQL DB
//author: Marius Riehl
//date:	  2017-03-15
//change: 2017-03-15

var mysql = require('mysql');
var connection = mysql.createConnection({
	host	:	'localhost',
	user	:	'marius',
	password:	'kih7ith9eedoj4ohN3w', //remove before comitting
	database:	'marius'
});

function checkMetaTable(){
	if(connect()){
		let query = "SELECT * FROM holiday_metadata";
		connection.query(query, function(err, rows, fields){
			connection.end();
			if(!err){
				if(rows == 'undefined'){ //dunno if its actually undefined
					//create DB
					createMetaDB();
				}
			}
		});
	}
}

function createMetaDB(){
	if(connect()){
		let query = "INSERT INTO holiday_metadata (id,data) VALUES(totReqs,0),(totSize, 0)";
		connection.query(query, function(err, rows, fields){
			connection.end();
			if(!err){
				return true; //table created succesfuly
			}
		});
	}
	return false;
}


function getValues(name){
	if(connect()){
		let query = "SELECT data FROM holiday_metadata WHERE id = '" + name + "' LIMIT 1";
		connection.query(query, function(err, rows, fields){
			connection.end();
			if(!err){
				return rows;
			}
		});
	}
	return false;
}

function connect(){
	connection.connect(function (err){
		if(!err){
			return true;
		}else{
			console.log("Error connecting to DB");
			return false;
		}
	})
}

function logMetaToDB(string){
	//add Byte Size of string to total Mbytes and increment total request count
	
	let mb = getValues('totSize');
	let rc = getValues('totReqs');
	
	
	if(connect()){
		connection.query('', function(err, rows, fields){
			
			//work with returned data rows / fields:
			
			connection.end();
		});
		
	}
	return;
}

function logRequestToDB(request){
	
	return;
}

function logStartupToDB(time){
	//Date.now() in main.js already returns correct format (int)
	
	
	return;
}



module.exports = {
		logStartup: function(time){
			logStartupToDB(time);
			return;
		},
		logMeta: function(string){
			logMet
		},
		logRequest: function(request){
			
		}	
}