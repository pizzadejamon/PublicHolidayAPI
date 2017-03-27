//Country File for Netherlands / Niederlande - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-24
//change: 2017-03-24
var basiccalc = require('./../basiccalc.js');


//object containing netherlands holidays
var phodays;
var container = {
		"num": 12,
		"holidays":[
			{
				"name": "Nieuwjaarsdag",
				"tname": "New Year's Day",
				"region": "NL: Nationwide",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Goede Vrijdag",
				"tname": "Good Friday",
				"region": "NL: Not a National Holiday: work contract",
				"date": "",
				"type": 1,
				"offset": -2
			},
			{
				"name": "Pasen",
				"tname": "Easter Sunday",
				"region": "NL: Nationwide",
				"date": "",
				"type": 1,
				"offset": 0
			},
			{
				"name": "Pasen",
				"tname": "Easter Monday",
				"region": "NL: Nationwide",
				"date": "",
				"type": 1,
				"offset": 1
			},
			{
				"name": "Koningsdag",
				"tname": "King's Day",
				"region": "NL: Nationwide",
				"date": "",
				"type": 0,
				"day": "04-27"
			},
			{
				"name": "Bevrijdingsdag",
				"tname": "Liberation Day",
				"region": "NL: Nationwide",
				"date": "",
				"type": 0,
				"day": "05-05"
			},
			{
				"name": "Hemelvaartsdag",
				"tname": "Ascension Day",
				"region": "NL: Nationwide",
				"date": "",
				"type": 1,
				"offset": 39
			},
			{
				"name": "Hemelvaartsdag: lange weekenden",
				"tname": "Subsequent friday: day off work",
				"region": "NL: Subsequent day to Ascension - work contract",
				"date": "",
				"type": 1,
				"offset": 40
			},
			{
				"name": "Pinksteren",
				"tname": "Pentecost",
				"region": "NL: Nationwide",
				"date": "",
				"type": 1,
				"offset": 49
			},
			{
				"name": "Pinksteren",
				"tname": "Whit Monday",
				"region": "NL: Nationwide",
				"date": "",
				"type": 1,
				"offset": 50
			},
			{
				"name": "Kerstmis",
				"tname": "Christmas Day",
				"region": "NL: Nationwide",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Kerstmis",
				"tname": "Saint Stephen's Day",
				"region": "NL:  Nationwide",
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
	
	//netherlands specific day dependencies:
	//if 27.4 is a sunday, add additional holiday on 26
	var date = new Date(year.toString() + '-04-27');
	if(date.getDay() == 0){
		let dummyDay = {	
			"name": "Koningsdag waargenomen",
			"tname": "King's Day observed",
			"region": "BG: Nationwide",
			"type": 0,
			"day": "04-27" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], year);
	}
}


//netherlands specific calculation
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