//Country File for Austria / Österreich - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-09
//change: 2017-03-09

var basiccalc = require('./../basiccalc.js');


//object containing austria holidays
var phodays;
var container = {
		"num": 17,
		"holidays":[
			{
				"name": "Neujahr",
				"tname": "New Year's Day",
				"region": "AT: Nationwide",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Heilige Drei Könige",
				"tname": "Epiphany",
				"region": "AT: Nationwide",
				"date": "",
				"type": 0,
				"day": "01-06"
			},
			{
				"name": "Joseftag",
				"tname": "St Joseph's Day",
				"region": "AT: Kärnten, Steiermark, Tirol, Voralberg",
				"date": "",
				"type": 0,
				"day": "03-19"
			},
			{
				"name": "Karfreitag",
				"tname": "Good Friday",
				"region": "AT: Nationwide",
				"date": "",
				"type": 1,
				"offset": -2
			},
			{
				"name": "Ostermontag",
				"tname": "Easter Monday",
				"region": "AT: Nationwide",
				"date": "",
				"type": 1,
				"offset": 1
			},
			{
				"name": "Staatsfeiertag",
				"tname": "National Day",
				"region": "AT: Nationwide",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "Christi-Himmelfahrt",
				"tname": "Ascension",
				"region": "AT: Nationwide",
				"date": "",
				"type": 1,
				"offset": 39
			},
			{
				"name": "Pfingstmontag",
				"tname": "Whit Monday",
				"region": "AT: Nationwide",
				"date": "",
				"type": 1,
				"offset": 50
			},
			{
				"name": "Fronleichnam",
				"tname": "Corpus Christi",
				"region": "AT: Nationwide",
				"date": "",
				"type": 1,
				"offset": 60
			},
			{
				"name": "Mariä Himmelfahrt",
				"tname": "Assumption of the Virgin Mary",
				"region": "AT: Nationwide",
				"date": "",
				"type": 0,
				"day": "08-15"
			},
			{
				"name": "Nationalfeiertag",
				"tname": "National Holiday",
				"region": "AT: Nationwide",
				"date": "",
				"type": 0,
				"day": "10-26"
			},
			{
				"name": "Allerheiligen",
				"tname": "All Saints' Day",
				"region": "Nationwide",
				"date": "",
				"type": 0,
				"day": "11-01"
			},
			{
				"name": "Mariä Empfängnis",
				"tname": "Immaculate Conception",
				"region": "AT: Nationwide",
				"date": "",
				"type": 0,
				"day": "12-08"
			},
			{
				"name": "Heiliger Abend",
				"tname": "Christmas Eve",
				"region": "AT: Nationwide (work contract)",
				"date": "",
				"type": 0,
				"day": "12-24"
			},
			{
				"name": "Christtag",
				"tname": "Christmas Day",
				"region": "AT: Nationwide",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Stefanitag",
				"tname": "Saint Stephen's Day",
				"region": "AT: Nationwide",
				"date": "",
				"type": 0,
				"day": "12-26"
			},
			{
				"name": "Silvester",
				"tname": "New Year's Eve",
				"region": "AT: Nationwide (work contract)",
				"date": "",
				"type": 0,
				"day": "12-31"
			},
		]	
	};



//main function of de.js, itterates through all holidays, applies calculation
function processForYear(year){
	for(var i = 0; i < phodays.num; i++){
		
		//this switch has to be alltered in every calculation
		switch(phodays.holidays[i].type){ 
		case 0:
			basiccalc.getSetDays(phodays.holidays[i], year);
			break;
		case 1:
			processEasterHolidays(year);
			break;
		}
	}

}


//austria specific calculation
function processEasterHolidays(year){
	var easterday = new Date(year.toString() + '-' + basiccalc.getEasterDay(year));
	
	
	for(var i = 0; i < phodays.num; i++){
		if(phodays.holidays[i].type == 1)
		{
			var d = new Date();
			
			d.setTime(easterday.getTime() + phodays.holidays[i].offset * 86400000);
			phodays.holidays[i].date = d.toISOString().substring(0, 10);
		}
	}
}




//used in mains.js when requesting calender for country
module.exports = {
		getHolidays: function (year){
			phodays = JSON.parse(JSON.stringify(container));
			processForYear(year);
			return phodays;
		}
}