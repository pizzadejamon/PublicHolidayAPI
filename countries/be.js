//Country File for Belgium / Belgien - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-09
//change: 2017-03-09

var basiccalc = require('./../basiccalc.js');


//object containing belgian holidays
var phodays = {
		"num": 10,
		"holidays":[
			{
				"name": "Nieuwjaar",
				"tname": "New Year's Day",
				"region": "BE: Nationwide",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Paasmaandag",
				"tname": "Easter Monday",
				"region": "BE: Nationwide",
				"date": "",
				"type": 1,
				"offset": 1
			},
			{
				"name": "Dag van de arbeid",
				"tname": "Labour Day",
				"region": "BE: Nationwide",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "Onze Lieve Heer hemelvaart",
				"tname": "Ascension",
				"region": "BE: Nationwide",
				"date": "",
				"type": 1,
				"offset": 39
			},
			{
				"name": "Pinkstermaandag",
				"tname": "Pentecost Monday",
				"region": "BE: Nationwide",
				"date": "",
				"type": 1,
				"offset": 50
			},
			{
				"name": "Nationale feestdag",
				"tname": "Belgian National Day",
				"region": "BE: Nationwide",
				"date": "",
				"type": 0,
				"day": "06-21"
			},
			{
				"name": "Onze Lieve Vrouw hemelvaart",
				"tname": "Assumption of Mary",
				"region": "BE: Nationwide",
				"date": "",
				"type": 0,
				"day": "08-15"
			},
			{
				"name": "Allerheiligen",
				"tname": "All Saints' Day",
				"region": "BE: Nationwide",
				"date": "",
				"type": 0,
				"day": "11-01"
			},
			{
				"name": "Wapenstilstand",
				"tname": "Armistice Day",
				"region": "BE: Nationwide",
				"date": "",
				"type": 0,
				"day": "11-11"
			},
			{
				"name": "Kerstmis",
				"tname": "Christmas",
				"region": "BE: Nationwide",
				"date": "",
				"type": 0,
				"day": "12-25"
			}
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
			processForYear(year);
			return phodays;
		}
}