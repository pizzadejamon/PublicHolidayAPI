//Country File for Germany / Deutschland - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-08
//change: 2017-03-09
var basiccalc = require('./../basiccalc.js');


//object containing german holidays
var phodays = {
		"num": 17,
		"holidays":[
			{
				"name": "Neujahr",
				"tname": "New Year's Day",
				"region": "DE: Nationwide",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Heilige Drei Könige",
				"tname": "Epiphany",
				"region": "DE: Baden-Württemberg, Bavaria, Saxony-Anhalt",
				"date": "",
				"type": 0,
				"day": "01-06"
			},
			{
				"name": "Karfreitag",
				"tname": "Good Friday",
				"region": "DE: Nationwide",
				"date": "",
				"type": 1,
				"offset": -2
			},
			{
				"name": "Ostersonntag",
				"tname": "Easter Sunday",
				"region": "DE: Brandenburg, Hesse",
				"date": "",
				"type": 1,
				"offset": 0
			},
			{
				"name": "Ostermontag",
				"tname": "Easter Monday",
				"region": "DE: Nationwide",
				"date": "",
				"type": 1,
				"offset": 1
			},
			{
				"name": "Erster Mai, Tag der Arbeit",
				"tname": "Labour Day",
				"region": "DE: Nationwide",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "Christi-Himmelfahrt",
				"tname": "Ascension Day",
				"region": "DE: Nationwide",
				"date": "",
				"type": 1,
				"offset": 39
			},
			{
				"name": "Pfingstsonntag",
				"tname": "Pentecost",
				"region": "DE: Brandenburg, Hesse",
				"date": "",
				"type": 1,
				"offset": 49
			},
			{
				"name": "Pfingstmontag",
				"tname": "Whit Monday",
				"region": "DE: Nationwide",
				"date": "",
				"type": 1,
				"offset": 50
			},
			{
				"name": "Fronleichnam",
				"tname": "Corpus Christi",
				"region": "DE: Baden-Württemberg, Bavaria, Hesse, North Rhine-Westphalia, Rhineland-Palatinate, Saarland, Thuringia",
				"date": "",
				"type": 1,
				"offset": 60
			},
			{
				"name": "Mariä Himmelfahrt",
				"tname": "Assumption Day",
				"region": "DE: Bavaria, Saarland",
				"date": "",
				"type": 0,
				"day": "08-15"
			},
			{
				"name": "Tag der deutschen Einheit",
				"tname": "German Unity Day",
				"region": "DE: Nation-Wide",
				"date": "",
				"type": 0,
				"day": "10-03"
			},
			{
				"name": "Reformation",
				"tname": "Reformation Day",
				"region": "DE: Brandenburg, Mecklenburg-Vorpommern, Saxony, Saxony-Anhalt, Thuringia",
				"date": "",
				"type": 0,
				"day": "10-31"
			},
			{
				"name": "Allerheiligen",
				"tname": "All Saints' Day",
				"region": "DE: Baden-Württemberg, Bavaria, North Rhine-Westphalia, Rhineland-Palatinate, Saarland",
				"date": "",
				"type": 0,
				"day": "11-01"
			},
			{
				"name": "Buß- und Bettag",
				"tname": "Repentance and Prayer Day",
				"region": "DE: Saxony",
				"date": "",
				"type": 5
			},
			{
				"name": "Erster Weihnachtsfeiertag",
				"tname": "Christmas Day",
				"region": "DE: Nationwide",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Zweiter Weihnachtsfeiertag",
				"tname": "Saints Stephen's Day",
				"region": "DE:  Nationwide",
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
		case 5:
			processBettag(phodays.holidays[i], year);
			break;
		}
	}
}


//germany specific calculation
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
//germany specific calculation
function processBettag(obj, year){
	//get 23.11.year
	let n = year.toString() + '-' + "11-23";
	let d = new Date(n);
	let day = d.getDay();
	
	//wednesday = 3
	var offset = -4 - day;
	if(day > 3){
		offset += 7;
	}

	d.setTime(d.getTime() + offset * 86400000);
	obj.date = d.toISOString().substring(0, 10);
	
}



//used in mains.js when requesting calender for country
module.exports = {
		getHolidays: function (year){
			processForYear(year);
			return phodays;
		}
}