//Country File for Switzerland / Schweiz - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-08
//change: 2017-03-09

var basiccalc = require('./../basiccalc.js');

//object containing switzerland holidays
var phodays;
var container = {
		"num": 16,
		"holidays":[
			{
				"name": "Neujahrstag",
				"tname": "New Year's Day",
				"region": "CH: Nationwide",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Berchtoldstag",
				"tname": "St. Berchtold",
				"region": "CH: Not all cantons",
				"date": "",
				"type": 0,
				"day": "02-01"
			},
			{
				"name": "Heilige Drei Könige",
				"tname": "Epiphany",
				"region": "CH: Not all cantons",
				"date": "",
				"type": 0,
				"day": "01-06"
			},
			{
				"name": "Joseftag",
				"tname": "St Joseph's Day",
				"region": "CH: Not all cantons",
				"date": "",
				"type": 0,
				"day": "03-19"
			},
			{
				"name": "Karfreitag",
				"tname": "Good Friday",
				"region": "CH: Nationwide",
				"date": "",
				"type": 1,
				"offset": -2
			},
			{
				"name": "Ostermontag",
				"tname": "Easter Monday",
				"region": "CH: Nationwide",
				"date": "",
				"type": 1,
				"offset": 1
			},
			{
				"name": "Tag der Arbeit",
				"tname": "Labour Day",
				"region": "CH: Not all cantons",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "Auffahrt",
				"tname": "Ascension",
				"region": "CH: Nationwide",
				"date": "",
				"type": 1,
				"offset": 39
			},
			{
				"name": "Pfingstmontag",
				"tname": "Whit Monday",
				"region": "CH: Nationwide",
				"date": "",
				"type": 1,
				"offset": 50
			},
			{
				"name": "Fronleichnam",
				"tname": "Corpus Christi",
				"region": "CH: Nationwide",
				"date": "",
				"type": 1,
				"offset": 60
			},
			{
				"name": "Bundesfeier",
				"tname": "Swiss National Day",
				"region": "CH: Nationwide",
				"date": "",
				"type": 0,
				"day": "08-01"
			},
			{
				"name": "Mariä Himmelfahrt",
				"tname": "Assumption of the Virgin Mary",
				"region": "CH: Mostly all cantons",
				"date": "",
				"type": 0,
				"day": "08-15"
			},
			{
				"name": "Allerheiligen",
				"tname": "All Saints' Day",
				"region": "CH: Mostly all cantons",
				"date": "",
				"type": 0,
				"day": "11-01"
			},
			{
				"name": "Mariä Empfängnis",
				"tname": "Immaculate Conception",
				"region": "CH: Some cantons",
				"date": "",
				"type": 0,
				"day": "12-08"
			},
			{
				"name": "Weihnachtstag",
				"tname": "Christmas Day",
				"region": "CH: Nationwide",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Stephanstag",
				"tname": "Saint Stephen's Day",
				"region": "CH: Nationwide",
				"date": "",
				"type": 0,
				"day": "12-26"
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


//switzerland specific calculation
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