//Country File for United States of America / Vereinigte Staaten von Amerika - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-08
//change: 2017-03-09

var basiccalc = require('./../basiccalc.js');

//object containing USA holidays
var phodays;
var container = {
		"num": 12,
		"holidays":[
			{
				"name": "New Year's Day",
				"tname": "New Year's Day",
				"region": "US: Nationwide / Federal",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Independence Day",
				"tname": "Independence Day",
				"region": "US: Nationwide / Federal",
				"date": "",
				"type": 0,
				"day": "07-04"
			},
			{
				"name": "Veterans Day",
				"tname": "Veterans Day",
				"region": "US: Nationwide / Federal",
				"date": "",
				"type": 0,
				"day": "11-11"
			},
			{
				"name": "Christmas Day",
				"tname": "Christmas Day",
				"region": "US: Nationwide / Federal",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Martin Luther King Day",
				"tname": "Martin Luther King Day",
				"region": "US: Nationwide / Federal",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 1,
				"offset": 2
			},
			{
				"name": "Presidents' Day",
				"tname": "Presidents' Day",
				"region": "US: Federal / Not a public holiday in DE, FL, GA, IA, KS, KY, LA, " +
						  "NM, NC, RI, WI / IN: date varies.",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 2,
				"offset": 2
			},
			{
				"name": "Memorial Day",
				"tname": "Memorial Day",
				"region": "US: Federal",
				"date": "",
				"type": 3,
				"day": 1,
				"month": 5
			},
			{
				"name": "Labor Day",
				"tname": "Labor Day",
				"region": "US: Federal",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 9,
				"offset": 0
			},
			{
				"name": "Columbus Day",
				"tname": "Columbus Day",
				"region": "US: Federal / public holiday in AL, AZ, CO, CT, GA, ID, IL, IN, IA, MD, MA, MN, MO, MT, NE, NH, NJ, NM, NY, OH, PA, RI, SC, SD, TN, VT, VA, WA, WV, WI",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 10,
				"offset": 1
			},
			{
				"name": "Thanksgiving Day",
				"tname": "Thanksgiving Day",
				"region": "US: Federal",
				"date": "",
				"type": 2,
				"day": 4,
				"month": 11,
				"offset": 3
			},
			{
				"name": "Day after Thanksgiving / Black Friday",
				"tname": "Day after Thanksgiving / Black Friday",
				"region": "US: Regional / AR, CA, DE, FL, GA, IL, IN, IA, KY, ME, MD, MI, MN, NE, NV, NH, NM, OH, OK, PA, SC, TX, WV, WI",
				"date": "",
				"type": 2,
				"day": 4,
				"month": 11,
				"offset": 3,
				"addoffset": 1,
			},
			{
				"name": "Election Day",
				"tname": "Election Day",
				"region": "US: Regional / DE, HI, IL, MT, NJ, NY, PA, RI",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 11,
				"offset": 0,
				"addoffset": 1,
			}
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
	
	//if 01.01 is a sunday, add additional holiday on 02
	date = new Date(year.toString() + "-01-01");
	if(date.getDay() == 0){
		let dummyDay = {	
				"name": "New Year's Day observed",
				"tname": "New Year's Day observed",
				"region": "US: Nationwide / Federal",
				"type": 0,
				"day": "01-02" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], year);
	}
	//if 01.01 is a saturday, add additional holiday on 12-31
	date = new Date(year.toString() + "-01-01");
	if(date.getDay() == 6){
		let dummyDay = {	
				"name": "New Year's Day observed",
				"tname": "New Year's Day observed",
				"region": "US: Nationwide / Federal",
				"type": 0,
				"day": "12-31" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], (year -1));
	}
	
	//if 25.12 is a sunday, add additional holiday on 26
	date = new Date(year.toString() + "-12-25");
	if(date.getDay() == 0){
		let dummyDay = {	
				"name": "Christmas Day observed",
				"tname": "Christmas Day observed",
				"region": "US: Nationwide / Federal",
				"type": 0,
				"day": "12-26" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], year);
	}
	//if 25.12 is a saturday, add additional holiday on 24
	date = new Date(year.toString() + "-12-25");
	if(date.getDay() == 6){
		let dummyDay = {	
				"name": "Christmas Day observed",
				"tname": "Christmas Day observed",
				"region": "US: Nationwide / Federal",
				"type": 0,
				"day": "12-24" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], year);
	}
	
	//if 04.07 is a sunday, add additional holiday on 5
	date = new Date(year.toString() + "-07-04");
	if(date.getDay() == 0){
		let dummyDay = {	
				"name": "Independence Day observed",
				"tname": "Independence Day observed",
				"region": "US: Nationwide / Federal",
				"type": 0,
				"day": "07-05" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], year);
	}
	//if 25.12 is a saturday, add additional holiday on 24
	date = new Date(year.toString() + "-07-04");
	if(date.getDay() == 6){
		let dummyDay = {	
				"name": "Independence Day observed",
				"tname": "Independence Day observed",
				"region": "US: Nationwide / Federal",
				"type": 0,
				"day": "07-03" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], year);
	}
}



module.exports = {
		getHolidays: function (year){
			phodays = JSON.parse(JSON.stringify(container));
			processForYear(year);
			return phodays;
		}
}