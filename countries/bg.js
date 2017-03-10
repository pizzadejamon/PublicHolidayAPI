//Country File for Bulgaria / Bulgarien - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-10
//change: 2017-03-10
var basiccalc = require('./../basiccalc.js');


//object containing german holidays
var phodays = {
		"num": 17,
		"holidays":[
			{
				"name": "Нова година",
				"tname": "New Year's Day",
				"region": "BG: Nationwide",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Ден на Освобождението на България от османско робство",
				"tname": "Liberation Day",
				"region": "BG: Nationwide",
				"date": "",
				"type": 0,
				"day": "03-03"
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
				"name": "Karsamstag",
				"tname": "Good Friday",
				"region": "DE: Nationwide",
				"date": "",
				"type": 1,
				"offset": -1
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
				"name": "Ден на труда и на международната работническа солидарност",
				"tname": "Labour Day",
				"region": "BG: Nationwide",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "Гергьовден, ден на храбростта и Българската армия",
				"tname": "Saint Georg's Day",
				"region": "BG: Nationwide",
				"date": "",
				"type": 0,
				"day": "05-06"
			},
			{
				"name": "Ден на българската просвета и култура и на славянската писменост",
				"tname": "Saints Cyril and Methodius Day",
				"region": "BG: Nationwide",
				"date": "",
				"type": 0,
				"day": "05-24"
			},
			{
				"name": "Ден на Съединението",
				"tname": "Unification Day",
				"region": "BG: Nationwide",
				"date": "",
				"type": 0,
				"day": "09-06"
			},
			{
				"name": "Ден на независимостта на България",
				"tname": "Independence Day",
				"region": "BG: Nationwide",
				"date": "",
				"type": 0,
				"day": "09-22"
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