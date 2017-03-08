//public holiday calculation for germany
//returns JSON object
var basiccalc = require('./basiccalc.js');



//Date is in ISO Format:
//YYYY-MM-DD

//type 0: set day (25.12 = Christmas)
//type 1: first or index (like "1st monday september", or "third monday may") OFFSET = WEEKS (3rd monday = 1st monday + 2 weeks)
//type 2: last (like "last monday of september)

//object containing german holidays
var phodays = {
		"num": 17,
		"holidays":[
			{
				"name": "New Years Day",
				"region": "Federal",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Independence Day",
				"region": "Federal",
				"date": "",
				"type": 0,
				"day": "07-04"
			},
			{
				"name": "Veterans Day",
				"region": "Federal",
				"date": "",
				"type": 0,
				"day": "11-11"
			},
			{
				"name": "Christmas",
				"region": "Federal",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Martin Luther King Day",
				"region": "Federal",
				"date": "",
				"type": 1,
				"day": 1,
				"month": 1,
				"offset": 2
			},
			{
				"name": "Washingtons Birthday",
				"region": "Federal",
				"date": "",
				"type": 1,
				"day": 1,
				"month": 2,
				"offset": 2
			},
			{
				"name": "Memorial Day",
				"region": "Federal",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 5
			},
			{
				"name": "Washingtons Birthday",
				"region": "Federal",
				"date": "",
				"type": 1,
				"day": 1,
				"month": 2,
				"offset": 2
			},
		]
			
	};

function processForYear(year){
	//for set days (example: christmas is always on 25.12.
	phodays = basiccalc.getSetDays(phodays, year);
	

	
	console.log(JSON.stringify(phodays));
	
}





module.exports = {
		getHolidays: function (year){
			processForYear(2017);
			return phodays;
		}
}




