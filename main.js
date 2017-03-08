//goal: this node.js server should receive a request, use info in request (contries etc) to do holiday request for current year
//and return ics file

//server objects (nice libraries :p)
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//general
var supported = ["DE", "US"];


//returns JSON object with all holidays of all countries (array)
function getData(countries, year){
	
	var de = require('./countries/de.js');
	var us = require('./countries/us.js');
	
	var data;
	
	for(var k = 0; k < countries.length; k++){
		var next;
		switch(countries[k]){
		case "DE":
			next = de.getHolidays(year);
			break;
		case "US":
			next = us.getHolidays(year);
			break;
		}
		
		if(k == 0){
			data = next;
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
	console.log(req.body);
	if(typeof req.body.year != 'undefined' && typeof req.body.countries != 'undefined'){
		//headers contain needed parameters, proceed (maybe check API key?)
		
		//check format
		if(req.body.year.length != 4){
			res.status(400).send("Bad Request. Wrong format for year parameter.")
		}
		
		//convert countries string to array
		let countries = req.body.countries.split(",");
		console.log(countries);
		
		//check if each country is supported and format is correct
		var isSupported = false;
		for(var j = 0; j < countries.length; j++){
			if(countries[j].length != 2){
				break;
			}
			
			//support for lower case countries
			countries[j].toUpperCase();
			
			for(var i = 0; i < supported.length; i++){
				if(countries[j] == supported[i]){
					isSupported = true;
					console.log(countries[j]);
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
		res.send(getData(countries, req.body.year));
		
		
		
	}else{
		res.status(400).send("Bad Request.");
	}
		
	
});




app.listen(4444); //change this port to whatever port is available on UberSpace Avior