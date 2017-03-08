//public holiday calculation for germany
//returns JSON object
var basiccalc = require('./../basiccalc.js');



//Date is in ISO Format:
//YYYY-MM-DD


//object containing USA holidays
var phodays = {
		"num": 10,
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
				"type": 2,
				"day": 1,
				"month": 1,
				"offset": 2
			},
			{
				"name": "Washingtons Birthday",
				"region": "Federal",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 2,
				"offset": 2
			},
			{
				"name": "Memorial Day",
				"region": "Federal",
				"date": "",
				"type": 3,
				"day": 1,
				"month": 5
			},
			{
				"name": "Labor Day",
				"region": "Federal",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 9,
				"offset": 0
			},
			{
				"name": "Columbus Day",
				"region": "Federal",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 10,
				"offset": 1
			},
			{
				"name": "Thanksgiving Day",
				"region": "Federal",
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
	console.log(JSON.stringify(phodays));
	
}

processForYear(2017);



module.exports = {
		getHolidays: function (year){
			processForYear(2017);
			return phodays;
		}
}




