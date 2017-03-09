//Country File for United States of America / Vereinigte Staaten von Amerika - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-08

var basiccalc = require('./../basiccalc.js');

//object containing USA holidays
var phodays = {
		"num": 10,
		"holidays":[
			{
				"name": "New Years Day",
				"region": "US: Federal",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Independence Day",
				"region": "US: Federal",
				"date": "",
				"type": 0,
				"day": "07-04"
			},
			{
				"name": "Veterans Day",
				"region": "US: Federal",
				"date": "",
				"type": 0,
				"day": "11-11"
			},
			{
				"name": "Christmas",
				"region": "US: Federal",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Martin Luther King Day",
				"region": "US: Federal",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 1,
				"offset": 2
			},
			{
				"name": "Washingtons Birthday",
				"region": "US: Federal",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 2,
				"offset": 2
			},
			{
				"name": "Memorial Day",
				"region": "US: Federal",
				"date": "",
				"type": 3,
				"day": 1,
				"month": 5
			},
			{
				"name": "Labor Day",
				"region": "US: Federal",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 9,
				"offset": 0
			},
			{
				"name": "Columbus Day",
				"region": "US: Federal",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 10,
				"offset": 1
			},
			{
				"name": "Thanksgiving Day",
				"region": "US: Federal",
				"date": "",
				"type": 2,
				"day": 4,
				"month": 11,
				"offset": 3
			},
		]
			
	};

function processForYear(year){

	for(var i = 0; i < phodays.num; i++){
		
		//this switch has to be alltered in every calculation
		switch(phodays.holidays[i].type){ 
		case 0:
			basiccalc.getSetDays(phodays.holidays[i], year);
			break;
		case 2:
			basiccalc.getIndexDays(phodays.holidays[i], year);
			break;
		case 3:
			basiccalc.getLastDays(phodays.holidays[i], year);
			break;
		}
	}
}



module.exports = {
		getHolidays: function (year){
			processForYear(year);
			return phodays;
		}
}