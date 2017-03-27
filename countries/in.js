//Country File for India / Indien - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-22
//change: 2017-03-22
var basiccalc = require('./../basiccalc.js');


//object containing indian holidays
var phodays;
var container = {
		"num": 3,
		"holidays":[
			{
				"name": "गणतंत्र दिवस",
				"tname": "Republic Day",
				"region": "IN: Nationwide / National Holiday",
				"date": "",
				"type": 0,
				"day": "01-26"
			},
			{
				"name": "स्वतंत्रता दिवस",
				"tname": "Independence Day",
				"region": "IN: Nationwide / National Holiday",
				"date": "",
				"type": 0,
				"day": "08-15"
			},
			{
				"name": "गांधी जयंती",
				"tname": "Gandhi Jayanthi",
				"region": "IN: Nationwide / National Holiday",
				"date": "",
				"type": 0,
				"day": "10-02"
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