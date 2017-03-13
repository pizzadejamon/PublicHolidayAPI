//PublicHolidayAPI
//main handles post-requests
//author: Marius Riehl
//date:	  2017-03-08
//change: 2017-03-10


//server objects (nice libraries :p)
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//general
var supported = ["DE", "US", "CH", "AT", "BE", "BG"]; //list of countries

var icsConverter = require('./icsConverter.js');
var xmlConverter = require('./xmlConverter.js');

function dataFromCountryString(countryCode, year){
	var next;
	var cc = undefined;
	cc = require('./countries/' + countryCode.toLowerCase() + '.js');
	return next = JSON.parse(JSON.stringify(cc.getHolidays(year)));
	
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

	//now sort data, key is timestamp of date
	data.holidays.sort(function(a, b){
		var x = a['date']; var y = b['date'];
		var x1 = (new Date(x)).getTime(); var y1 = (new Date(y)).getTime();
		return ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : 0));
	});
	return data;
}

//gets the next holiday (from now on)
function getNextHoliday(countries, year){
	var time = Date.now();
	var data = getData(countries, year);
	for(var i = 0; i < data.num; i++){
		var date = new Date(data.holidays[i].date);
		if(date.getTime() > time){
			
			//is this date used in other countries too? 
			var j = i + 1;
			while(data.holidays[j].date == data.holidays[i].date){
				data.holidays[i].name += ", " + data.holidays[j].name;
				data.holidays[i].region += ", " + data.holidays[j].region;
				j++;
			}
			data.holidays[i].countryCount = j - i;
			return data.holidays[i];
		}
	}
}





//miscallaneous functions
function getCountryArray(countrystring){
	//delete all spaces from countries string
	countrystring = countrystring.replace(/\s+/g, '');
	//support lower case chars
	countrystring = countrystring.toUpperCase();
	//convert countries string to array
	let countries = countrystring.split(",");
	//check last char and empty
	for(var i = 0; i < countries.length; i++){
		if(countries[i] == ''){
			countries.splice(i, 1);
		}
	}
	return countries;
}



//post request handling function
function checkCountry(req, res){
	//check countries
	let countries = getCountryArray(req);
	
	//check if each country is supported and format is correct
	for(var j = 0; j < countries.length; j++){
		
		if(countries[j].length != 2){
			res.status(400).send("Bad Request. Wrong country request format. Use: AA,BB,CC");
			return false;
		}
		
		
		if(supported.indexOf(countries[j]) == -1){
			res.status(400).send("Bad Request. Country " + countries[j] + " not supported.");
			return false;
		}
	}
	return countries; //return array, if everything is fine
}
function checkYear(req, res){
	//check year
	let p = req.replace(/\D/g, ''); //remove non numeric chars
	if(p != req){
		res.status(400).send("Bad Request. Only non numeric characters in [year] parameter are allowed.");
		return false;
	}
	
	if(req.length != 4){
		res.status(400).send("Bad Request. Wrong format for year parameter.");
		return false;
	}
	if(parseInt(req) < 1970){
		res.status(400).send("Bad Request. Year must be >= 1970.");
		return false;
	}
	return p; //return formatted string, if everything is fine
}
function checkDate(req, res){
	//check dates for area type request
	if(req.length != 10){ //wrong length
		res.status(400).send("Bad Request. Invalid date format. Use ISO-8601 YYYY-MM-DD");
		return false;
	}
	let p = req.replace(/\D/g, ''); //remove non numeric chars
	p = req.replace(/[0-9]/g, 'X'); //replace numeric with X for format check
	if(p != "XXXX-XX-XX"){
		res.status(400).send("Bad Request. Invalid date format. Use ISO-8601 YYYY-MM-DD");
		return false;
	}
	if(parseInt(req.substring(0,4)) < 1970){
		res.status(400).send("Bad Request. Year must be >= 1970.");
		return false;
	}
	let q = Date.parse(req);
	if(isNaN(q)){
		res.status(400).send("Bad Request. Invalid date object. Use ISO-8601 YYYY-MM-DD");
		return false;
	}
		
	return true;	//everything fine, return true
}
function checkResponseType(req, res){
	//check if response type is supported
	req = req.toUpperCase();
	if(req == "XML" || req == "JSON" || req == "ICS"){
		return true;
	}else{
		res.status(400).send("Bad Request. Response type not supported. Use: XML, JSON, ICS");
		return false;
	}
}

//list type, process here
//required params: countries, year
function typeList(req, res){
	
	//check required params
	if(typeof req.body.countries == "undefined" || typeof req.body.year == "undefined" || req.body.year == "" || req.body.countries == ""){
		res.status(400).send("Bad Request. Check API documentation for required params.");
		return;
	}
	
	//check year
	let year = checkYear(req.body.year, res);
	if(typeof year != "string"){ //returns false, when something is wrong, and correct string if its fine
		return;
	}
	
	//check countries
	let countries = checkCountry(req.body.countries, res);
	if(!Array.isArray(countries)){ //returns array if everything is fine, returns false if not
		return;
	}

	//check responsetype
	if(typeof req.body.responsetype == "undefined" || req.body.responsetype == ""){req.body.responsetype = "JSON";}
	if(!checkResponseType(req.body.responsetype, res)){
		return; //returnd false, stop
	}req.body.responsetype = req.body.responsetype.toUpperCase();

	//everything fine, get the data and send response
	try{
		switch(req.body.responsetype){
		case "JSON":
			res.send(clearList(getData(countries, year)));
			return;
		case "ICS":
			res.send(icsConverter.getICS(clearList(getData(countries, year))));
			return;
		case "XML":
			res.send(xmlConverter.getXML(clearList(getData(countries, year))));
			return;
		}
	}catch(err){
		console.log(err); //internal error, prevent server from crashing and log error
		res.status(500).send("Internal Server Error. Something went wrong");
	}
	return;
}

//next type, required params: countries (only)
function typeNext(req, res){
	//check required params
	if(typeof req.body.countries == "undefined" || req.body.countries == ""){
		res.status(400).send("Bad Request. Check API documentation for required params.");
		return;
	}
	
	//check countries
	let countries = checkCountry(req.body.countries, res);
	if(!Array.isArray(countries)){ //returns array if everything is fine, returns false if not
		return;
	}
	
	//check responsetype
	if(typeof req.body.responsetype == "undefined" || req.body.responseType == ""){req.body.responsetype = "JSON";}
	if(!checkResponseType(req.body.responsetype, res)){
		return; //returnd false, stop
	}req.body.responsetype = req.body.responsetype.toUpperCase();
	
	//get data and respond
	try{
		let p = new Date();
		switch(req.body.responsetype){
		case "JSON":
			res.send(clearParams(getNextHoliday(countries, p.toISOString().substring(0, 4))));
			return;
		case "ICS":
			res.send(icsConverter.getICS(clearParams(getNextHoliday(countries, p.toISOString().substring(0, 4)))));
			return;
		case "XML":
			res.send(xmlConverter.getXML(clearParams(getNextHoliday(countries, p.toISOString().substring(0, 4)))));
		}
	}catch(err){
		console.log(err);
		res.status(500).send("Internal Server Error. Something went wrong");
	}
	return;
}

//area type, required params: countries, start, end in ISO 8601 format
function typeArea(req, res){
	//check required params
	if(typeof req.body.countries == "undefined" || typeof req.body.start == "undefined" || typeof req.body.end == "undefined" || 
			req.body.start == "" || req.body.end == "" || req.body.countries == ""){
		res.status(400).send("Bad Request. Check API documentation for required params.");
		return;
	}
	
	//check countries
	let countries = checkCountry(req.body.countries, res);
	if(!Array.isArray(countries)){ //returns array if everything is fine, returns false if not
		return;
	}
	
	//check responsetype
	if(typeof req.body.responsetype == "undefined" || req.body.responsetype == ""){req.body.responsetype = "JSON";}
	if(!checkResponseType(req.body.responsetype, res)){
		return; //returned false, stop, else ok
	}req.body.responsetype = req.body.responsetype.toUpperCase();
	
	//check start and end date
	if(!checkDate(req.body.start, res) || !checkDate(req.body.end, res)){
		return; //date check invalid
	}//else:
	//new date objects
	let x = new Date(req.body.start);
	let y = new Date(req.body.end);
	
	//calculate number of years
	var dt = parseInt(y.toISOString().substring(0, 4)) - parseInt(x.toISOString().substring(0, 4)) + 1;
	if(dt < 1){
		res.status(400).send("Bad request. Start date must be before end date.");
		return;
	}else if(dt > 10){
		res.status(400).send("Bad request. Not more than 10 years area allowed.");
		return;
	}
	//date format is valid, got dt (number of years inbetween
	var data = undefined;
	var next = undefined;
	
	try{
		for(var i = 0; i < dt; i++){ //itterate through the years and put the data together
			next = undefined;
			let z = (parseInt(x.toISOString().substring(0, 4)) + i).toString();
			next = clearList(getData(countries, z));
			if(i < 1){
				data = JSON.parse(JSON.stringify(next)); //copy data into object
			}else{
				data.num += next.num;
				data.holidays = data.holidays.concat(next.holidays);
			}
		
		}
		//ok, got the object, now itterate through the first year, delete all that are smaller than x
		let j = 0;let v = data.num -1;
		while(parseInt(data.holidays[j].date.substring(0, 4)) == x.getFullYear() && v > 0){
			let p = (new Date(data.holidays[j].date)).getTime();
			if(p < x.getTime()){
				data.holidays.splice(0, 1); //remove out of array
				data.num--;
				j--; //nachrücken problem
			}
			j++;v--;
		}//not itterate through the last year backwards, delete all that are bigger than x
		let k = data.num - 1; v = data.num - 1;
		while(parseInt(data.holidays[k].date.substring(0, 4)) == y.getFullYear() && v > 0){
			let p = (new Date(data.holidays[k].date)).getTime();
			if(p > y.getTime()){
				data.holidays.splice(data.holidays.length -1, 1); //remove out of array
				data.num--;
			}
			k--;v--;
		}
		//hardcoded check for last one///////////////////////////////////////////////////////
		let p = (new Date(data.holidays[data.num-1].date)).getTime();						//this has to be removed by improving the logic!
		if(p > y.getTime()){
			data.holidays.splice(data.holidays.length -1, 1); //remove out of array
			data.num--;
		}
		////////////////////////////////////////////////////////////////////////////////////
		//check if no holidays were found
		if(data.num > 0){
			switch(req.body.responsetype){
			case "JSON":
				res.send(data);
				return;
			case "ICS":
				res.send(icsConverter.getICS(data));
				return;
			case "XML":
				res.send(xmlConverter.getXML(data));
			}
		}else{
			res.send("No Holidays found for the supplied params.");
		}
		
		return;
	}catch(err){
console.log(err);
		res.status(500).send("Internal Server Error. Something went wrong. We are currently working on fixing this.");
		return;
	}
	
}

//process and respond for incomming post requests
//check for correct body & parameters, crunch the numbers and return JSON Object
app.post('/data/', function(req, res){	
	if(typeof req.body.requesttype != 'undefined'){
		req.body.requesttype = req.body.requesttype.toUpperCase();
		switch(req.body.requesttype){
		case "LIST":
			typeList(req, res);
			return;
		case "NEXT":
			typeNext(req, res);
			break;
		case "AREA":
			typeArea(req, res);
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

//removes unwanted variables from object before sending it to client
function clearParams(obj){
		switch(obj.type){
		case 0:
			delete obj.day;
			break;
		case 1:
			delete obj.offset;
			break;
		case 2:
			delete obj.day;
			delete obj.month;
			delete obj.offset;
			break;
		case 3:
			delete obj.day;
			delete obj.month;
			break;
		}
		delete obj.type;
	
	return obj;
}

//removes unwanted variables of list
function clearList(obj){
	for(var i = 0; i < obj.num; i++){
		obj.holidays[i] = clearParams(obj.holidays[i]);
	}
	return obj;
}


//app listens for post (or get) requests
app.listen(4444); //change this port to whatever port is available on UberSpace Avior