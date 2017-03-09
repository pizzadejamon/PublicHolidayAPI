//server objects (nice libraries :p)
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//general
var supported = ["DE", "US", "CH", "AT"];


//returns JSON object with all holidays of all countries (array)
function getData(countries, year){
	var data = undefined;
	var next = undefined;
	for(var k = 0; k < countries.length; k++){
		next = undefined;
		
		switch(countries[k]){
		case "DE":
			var de = require('./countries/de.js');
			next = de.getHolidays(year);
			break;
		case "US":
			var us = require('./countries/us.js');
			next = us.getHolidays(year);
			break;
		case "CH":
			var ch = require('./countries/ch.js');
			next = ch.getHolidays(year);
			break;
		case "AT":
			var at = require('./countries/at.js');
			next = at.getHolidays(year);
			break;
		}
		
		
		if(k < 1){
			data = JSON.parse(JSON.stringify(next)); //thanks Dominik :D "js pros standard copy function"
		}else{
			data.num += next.num;
			data.holidays = data.holidays.concat(next.holidays);
		}
	}

	return data;
}


//process and respond for incomming post requests
//check for correct body & parameters, crunch the numbers and return JSON Object
app.post('/data/', function(req, res){
	if(typeof req.body.year != 'undefined' && typeof req.body.countries != 'undefined' && typeof req.body.requesttype != 'undefined'){
		//headers contain needed parameters, proceed (maybe check API key?)

		//check format
		if(req.body.year.length != 4){
			res.status(400).send("Bad Request. Wrong format for year parameter.")
		}
		
		//delete all spaces from countries string
		req.body.countries = req.body.countries.replace(/\s+/g, '');
		//support lower case chars
		req.body.countries = req.body.countries.toUpperCase();
		//convert countries string to array
		let countries = req.body.countries.split(",");
		console.log(countries);
		//check if each country is supported and format is correct
		var isSupported = false;
		for(var j = 0; j < countries.length; j++){
			if(countries[j].length != 2){
				break; //not in ISO 3166 Alpha-2 Format - stop
			}
			
			
			for(var i = 0; i < supported.length; i++){
				if(countries[j] == supported[i]){
					isSupported = true;
				}
			}
			if(isSupported == false){ //at least one is not supported, stop checking
				break;
			}
		}
		
		if(!isSupported){ //unsupported, throw error
			res.status(400).send("Bad Request. Wrong #countries# format, or >= 1 country not supported.");
		}
		
		//country is supported, everything checked, get the data:
		//react according to type
		switch(req.body.requesttype){
		case "list":
			try{
				res.send(getData(countries, req.body.year));
			}catch(err){
				//res.status(400).send("Bad Request. Your input produced an internal server error.");
			}
			break;
		default:
			res.status(400).send("Bad Request. Request-Type is not supported.");
			break;	
		}
		
		
		
	}else{
		res.status(400).send("Bad Request. Check API documentation for required params.");
	}
		
	
});



//app listens for post (or get) requests
app.listen(4444); //change this port to whatever port is available on UberSpace Avior