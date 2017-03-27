//Country File for UK / Vereinigtes Königreich - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-08
//change: 2017-03-10
var basiccalc = require('./../basiccalc.js');


//object containing uk holidays
var phodays;
var container = {
		"num": 12,
		"holidays":[
			{
				"name": "New Year's Day",
				"tname": "New Year's Day",
				"region": "UK: England, Northern Ireland and Wales",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "New Year's Day",
				"tname": "New Year's Day",
				"region": "UK: Scotland",
				"date": "",
				"type": 0,
				"day": "01-02"
			},
			{
				"name": "Saint Patrick's Day",
				"tname": "Saint Patrick's Day",
				"region": "UK: Northern Ireland only",
				"date": "",
				"type": 0,
				"day": "03-17"
			},
			{
				"name": "Good Friday",
				"tname": "Good Friday",
				"region": "UK: England, Scotland, Northern Ireland and Wales",
				"date": "",
				"type": 1,
				"offset": -2
			},
			{
				"name": "Easter Monday",
				"tname": "Easter Monday",
				"region": "UK: England, Scotland, Northern Ireland and Wales",
				"date": "",
				"type": 1,
				"offset": 1
			},
			{
				"name": "May Day Bank Holiday",
				"tname": "May Day Bank Holiday",
				"region": "UK: England, Scotland, Northern Ireland and Wales",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 5,
				"offset": 0
			},
			{
				"name": "Spring Bank Holiday",
				"tname": "Spring Bank Holiday",
				"region": "UK: England, Scotland (Ayr, Dundee, East Dunbartonshire, Glasgow, North Lanarkshire, Paisley, South Lanarkshire), Northern Ireland and Wales",
				"date": "",
				"type": 3,
				"day": 1,
				"month": 5
			},
			{
				"name": "Battle of the Boyne (Orangeman's Day)",
				"tname": "Battle of the Boyne (Orangeman's Day)",
				"region": "UK: Northern Ireland only",
				"date": "",
				"type": 0,
				"day": "07-12"
			},
			{
				"name": "Late Summer Bank Holiday",
				"tname": "Late Summer Bank Holiday",
				"region": "UK: England, Northern Ireland and Wales",
				"date": "",
				"type": 3,
				"day": 1,
				"month": 8
			},
			{
				"name": "Saint Andrew's Day",
				"tname": "Saint Andrew's Day",
				"region": "UK: Scotland / Bank Holiday (in lieu)",
				"date": "",
				"type": 0,
				"day": "11-30"
			},
			{
				"name": "Christmas Day",
				"tname": "Christmas Day",
				"region": "UK: England, Scotland, Northern Ireland and Wales",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Boxing Day",
				"tname": "Saint Stephen's Day",
				"region": "UK: England, Scotland, Northern Ireland and Wales",
				"date": "",
				"type": 0,
				"day": "12-26"
			},
		]
			
	};


//main function of uk.js, itterates through all holidays, applies calculation
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
		case 2:
			basiccalc.getIndexDays(phodays.holidays[i], year);
			break;
		case 3:
			basiccalc.getLastDays(phodays.holidays[i], year);
			break;
		}
	}
	
	//uk specific day dependencies:
	//if 01.01 is a sunday, add additional holiday on 02
	var date = new Date(year.toString() + '-01-01');
	if(date.getDay() == 0){
		let dummyDay = {	
			"name": "New Year's Day observed",
			"tname": "New Year's Day observed",
			"region": "UK: England, Northern Ireland, Wales",
			"type": 0,
			"day": "01-02" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], year);
	}
	//if 01.01 is a saturday, add additional holiday on 03
	date = new Date(year.toString() + '-01-02');
	if(date.getDay() == 6){
		let dummyDay = {	
			"name": "New Year's Day observed",
			"tname": "New Year's Day observed",
			"region": "UK: England, Northern Ireland, Wales",
			"type": 0,
			"day": "01-03" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], year);
	}
	//if 25.12 is a saturday or sunday, add additional holiday on 27
	date = new Date(year.toString() + '-12-25');
	if(date.getDay() == 6 || date.getDay() == 0){
		let dummyDay = {	
			"name": "Christmas Day observed",
			"tname": "Christmas Day observed",
			"region": "UK: England, Northern Ireland, Wales",
			"type": 0,
			"day": "12-27" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], year);
	}
	//if 25.12 is a saturday or sunday, add additional holiday on 27
	date = new Date(year.toString() + '-12-25');
	var date2 = new Date(year.toString() + '-12-26');
	if(date.getDay() == 6 || date2.getDay() == 6){
		let dummyDay = {	
			"name": "Christmas Day observed*",
			"tname": "Christmas Day observed*",
			"region": "UK: England, Northern Ireland, Wales by Royal Proclamation",
			"type": 0,
			"day": "12-28" 
		};
		phodays.holidays.push(dummyDay);
		phodays.num++;
		basiccalc.getSetDays(phodays.holidays[phodays.holidays.length-1], year);
	}
}


//uk specific calculation
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
			phodays = JSON.parse(JSON.stringify(container));
			processForYear(year);
			return phodays;
		}
}