//PublicHolidayAPI
//main handles post-requests
//author: Marius Riehl
//date:	  2017-03-08
//change: 2017-03-09


//server objects (nice libraries :p)
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//general
var supported = ["DE", "US", "CH", "AT", "BE"]; //list of countries


function dataFromCountryString(countryCode, year){
	var next;
	var cc = require('./countries/' + countryCode.toLowerCase() + '.js');
	return next = cc.getHolidays(year);
	
}

//returns JSON object with all holidays of all countries (array)
function getData(countries, year){
	var data = undefined;
	var next = undefined;
	for(var k = 0; k < countries.length; k++){
		next = undefined;
		
		next = dataFromCountryString(countries[k], year);
		
		
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
		//check last char and empty
		for(var i = 0; i < countries.length; i++){
			if(countries[i] == ''){
				countries.splice(i, 1);
			}
		}
		console.log(countries);
		
		//check if each country is supported and format is correct
		for(var j = 0; j < countries.length; j++){
			
			if(countries[j].length != 2){
				res.status(400).send("Bad Request. Wrong country request format. Use: AA,BB,CC");
				return;
			}
			
			
			if(supported.indexOf(countries[j]) == -1){
				res.status(400).send("Bad Request. Country " + countries[j] + " not supported.");
				return;
			}
		}

		
		//country is supported, everything checked, get the data:
		//react according to type
		switch(req.body.requesttype){
		case "list":
			try{
				res.send(getData(countries, req.body.year));
				return;
			}catch(err){
				console.log(err); //internal error, prevent server from crashing and log error
			}
			break;
		default:
			res.status(400).send("Bad Request. Request-Type is not supported.");
			return;	
		}
		
		
		
	}else{
		res.status(400).send("Bad Request. Check API documentation for required params.");
		return;
	}
		
	
});



//app listens for post (or get) requests
app.listen(4444); //change this port to whatever port is available on UberSpace Avior