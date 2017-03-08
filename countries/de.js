//public holiday calculation for germany
//returns JSON object
var basiccalc = require('./../basiccalc.js');



//Date is in ISO Format:
//YYYY-MM-DD


//object containing german holidays
var phodays = {
		"num": 17,
		"holidays":[
			{
				"name": "Neujahr",
				"region": "Alle Bundesländer",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Heilige Drei Könige",
				"region": "Baden-Württemberg, Bayern, Sachsen-Anhalt",
				"date": "",
				"type": 0,
				"day": "01-06"
			},
			{
				"name": "Karfreitag",
				"region": "Alle Bundesländer",
				"date": "",
				"type": 1,
				"offset": -2
			},
			{
				"name": "Ostersonntag",
				"region": "Brandenburg, Hessen",
				"date": "",
				"type": 1,
				"offset": 0
			},
			{
				"name": "Ostermontag",
				"region": "Alle Bundesländer",
				"date": "",
				"type": 1,
				"offset": 1
			},
			{
				"name": "Erster Mai, Tag der Arbeit",
				"region": "Alle Bundesländer",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "Christi-Himmelfahrt",
				"region": "Alle Bundesländer",
				"date": "",
				"type": 1,
				"offset": 39
			},
			{
				"name": "Pfingstsonntag",
				"region": "Brandenburg, Hessen",
				"date": "",
				"type": 1,
				"offset": 49
			},
			{
				"name": "Pfingstmontag",
				"region": "Alle Bundesländer",
				"date": "",
				"type": 1,
				"offset": 50
			},
			{
				"name": "Fronleichnam",
				"region": "Baden-Württemberg, Bayern, Hessen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Thüringen",
				"date": "",
				"type": 1,
				"offset": 60
			},
			{
				"name": "Mariä Himmelfahrt",
				"region": "Bayern, Saarland",
				"date": "",
				"type": 0,
				"day": "08-15"
			},
			{
				"name": "Tag der deutschen Einheit",
				"region": "Alle Bundesländer",
				"date": "",
				"type": 0,
				"day": "10-03"
			},
			{
				"name": "Reformation",
				"region": "Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt, Thüringen",
				"date": "",
				"type": 0,
				"day": "10-31"
			},
			{
				"name": "Allerheiligen",
				"region": "Baden-Württemberg, Bayern, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland",
				"date": "",
				"type": 0,
				"day": "11-01"
			},
			{
				"name": "Buß- und Bettag",
				"region": "Sachsen",
				"date": "",
				"type": 5
			},
			{
				"name": "Erster Weihnachtsfeiertag",
				"region": "Alle Bundesländer",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Zweiter Weihnachtsfeiertag",
				"region": "Alle Bundesländer",
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
	console.log(JSON.stringify(phodays));
}

processForYear(2017);






//germany specific calculation
function processEasterHolidays(year){
	var easterday = new Date(year.toString() + '-' + basiccalc.getEasterDay(year));
	
	
	for(var i = 0; i < phodays.num; i++){
		if(phodays.holidays[i].type == 1)
		{
			var d = new Date();
			
			d.setTime(easterday.getTime() + phodays.holidays[i].offset * 86400000);
			phodays.holidays[i].date = d.toISOString().substring(0, 10);
			delete phodays.holidays[i].type;
			delete phodays.holidays[i].offset;
		}
	}
}
//germany specific calculation
function processBettag(obj, year){
	//get 23.11.year
	let n = year.toString() + '-' + "11-23";
	let d = new Date(n);
	let day = d.getDay();
	
	//wendsday = 3
	var offset = -4 - day;
	if(day > 3){
		offset += 7;
	}

	d.setTime(d.getTime() + offset * 86400000);
	obj.date = d.toISOString().substring(0, 10);
	delete obj.type;
}



//used in mains.js when requesting calender for country
module.exports = {
		getHolidays: function (year){
			processForYear(2017);
			return phodays;
		}
}




