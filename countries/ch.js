//public holiday calculation for switzerland
//returns JSON object
var basiccalc = require('./../basiccalc.js');



//Date is in ISO Format:
//YYYY-MM-DD


//object containing switzerland holidays
var phodays = {
		"num": 16,
		"holidays":[
			{
				"name": "Neujahrstag",
				"region": "CH: Alle Kantonen",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Berchtoldstag",
				"region": "CH: Vereinzelte Kantonen",
				"date": "",
				"type": 0,
				"day": "02-01"
			},
			{
				"name": "Heilige Drei Könige",
				"region": "CH: Vereinzelte Kantonen",
				"date": "",
				"type": 0,
				"day": "01-06"
			},
			{
				"name": "Joseftag",
				"region": "CH: Vereinzelte Kantonen",
				"date": "",
				"type": 0,
				"day": "19-03"
			},
			{
				"name": "Karfreitag",
				"region": "CH: Alle Kantonen",
				"date": "",
				"type": 1,
				"offset": -2
			},
			{
				"name": "Ostermontag",
				"region": "CH: Alle Kantonen",
				"date": "",
				"type": 1,
				"offset": 1
			},
			{
				"name": "Tag der Arbeit",
				"region": "CH: Vereinzelte Kantonen",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "Auffahrt",
				"region": "CH: Alle Kantonen",
				"date": "",
				"type": 1,
				"offset": 39
			},
			{
				"name": "Pfingstmontag",
				"region": "CH: Alle Kantonen",
				"date": "",
				"type": 1,
				"offset": 50
			},
			{
				"name": "Fronleichnam",
				"region": "CH: Alle Kantonen",
				"date": "",
				"type": 1,
				"offset": 60
			},
			{
				"name": "Bundesfeier",
				"region": "CH: Alle Kantonen",
				"date": "",
				"type": 0,
				"day": "08-01"
			},
			{
				"name": "Mariä Himmelfahrt",
				"region": "CH: Überwiegend alle Kantonen",
				"date": "",
				"type": 0,
				"day": "08-15"
			},
			{
				"name": "Allerheiligen",
				"region": "CH: Überwiegend alle Kantonen",
				"date": "",
				"type": 0,
				"day": "11-01"
			},
			{
				"name": "Mariä Empfängnis",
				"region": "CH: Vereinzelte Kantonen",
				"date": "",
				"type": 0,
				"day": "12-08"
			},
			{
				"name": "Weihnachtstag",
				"region": "DE: Alle Bundesländer",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Stephanstag",
				"region": "DE: Alle Bundesländer",
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
			delete phodays.holidays[i].type;
			delete phodays.holidays[i].offset;
		}
	}
}




//used in mains.js when requesting calender for country
module.exports = {
		getHolidays: function (year){
			processForYear(year);
			return phodays;
		}
}




