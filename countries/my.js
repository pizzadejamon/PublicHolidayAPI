//Country File for Malaysia / Malaysia - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-28
//change: 2017-03-28
var basiccalc = require('./../basiccalc.js');

//this local uses EXTERNAL API (usa)
//required: moon phases (new moon / full moon) for buddah birthday, chinese new year... 
//do not forget to set timezones correctly for API requests

//object containing malaysia holidays
var phodays;
var container = {
		"num": 12,
		"holidays":[
			{
				"name": "Tahun Baru",
				"tname": "New Year's Day",
				"region": "MY: Nationwide, except Johor, Kedah, Kelantan, Perlis and Terengganu",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Hari Pekerja",
				"tname": "Labour Day",
				"region": "MY: Nationwide",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "hari Kebangsaan",
				"tname": "National Day / Independence Day",
				"region": "MY: Nationwide",
				"date": "",
				"type": 0,
				"day": "08-31"
			},
			{
				"name": "hari Malaysia",
				"tname": "Malaysia Day",
				"region": "MY: Nationwide",
				"date": "",
				"type": 0,
				"day": "08-31"
			},
			{
				"name": "hari Krismas",
				"tname": "Christmas Day",
				"region": "MY: Nationwide",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{
				"name": "Hari Keputeraan SPB Yang di Pertuan Agong",
				"tname": "Birthday of SPB Yang di Pertuan Agong",
				"region": "MY: Nationwide",
				"date": "",
				"type": 2,
				"day": 6,
				"month": 6,
				"offset": 0
			},
			{
				"name": "hari Wesak",
				"tname": "Wesak Day / Birth of Buddah",
				"region": "MY: Nationwide",
				"date": "",
				"type": 5
			},
			{
				"name": "tahun Baru Cina",
				"tname": "Chinese New Year",
				"region": "MY: Nationwide",
				"date": "",
				"type": 6,
				"offset": 0
			},
			{
				"name": "Cuti Tahun Baru Cina",
				"tname": "Chinese New Year Holiday",
				"region": "MY: Nationwide, exept Terengganu",
				"date": "",
				"type": 6,
				"offset": 1
			},
			{
				"name": "Tahun Baru Islam",
				"tname": "Islamic New Year",
				"region": "MY: Nationwide",
				"date": "",
				"type": 7,
				"offset": 0
			},
			{
				"name": "Hari Raya Aidilfitri",
				"tname": "Eid Al-Fitr",
				"region": "MY: Nationwide",
				"date": "",
				"type": 8,
				"offset": 0
			}
			,
			{
				"name": "Hari Raya Aidilfitri percutian",
				"tname": "Eid Al-Fitr Second Holiday",
				"region": "MY: Nationwide",
				"date": "",
				"type": 8,
				"offset": 1
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
		case 2:
			basiccalc.getIndexDays(phodays.holidays[i], year);
			break;
		case 5:
			calculateBuddah(year, i);
			break;
		case 6:
			calculateChineseNewYear(year, i);
			break;
		case 7:
			getIslamic(year, i, "Islamic New Year");
			break;
		case 8:
			getIslamic(year, i, "First Day of Shawwal");
			break;
		}
	}
}


//malaysia specific calculation
function calculateBuddah(year, k){ //calculates the full moon in may, == buddah birthday in Malaysia
	var request = require('sync-request');
	var url = "http://api.usno.navy.mil/moon/phase?date=5/1/" + year.toString() + "&nump=4";
	var res = request('GET', url);
	var obj = JSON.parse(res.body.toString('utf-8'));
	for(var i = 0; i < 4; i++){
		if(obj.phasedata[i].phase == "Full Moon"){
			//convert date format 2017 May 03 to my format
			var d = new Date(obj.phasedata[i].date);
			d.setTime(d.getTime() + 86400000); //one day offset, this is not correct at all times (like 2015), let the user change it
			phodays.holidays[k].date = d.toISOString().substring(0, 10);
			return;
		}
	}
}
function calculateChineseNewYear(year, k){
	var request = require('sync-request');
	var url = "http://api.usno.navy.mil/moon/phase?date=1/1/" + year.toString() + "&nump=8";
	var res = request('GET', url);
	var obj = JSON.parse(res.body.toString('utf-8'));
	for(var i = 0; i < 8; i++){
		var p = new Date(year.toString() + "-01-21");
		var d = new Date(obj.phasedata[i].date);
		if(obj.phasedata[i].phase == "Full Moon" && d.getTime() >= p.getTime()){
			//convert date format 2017 May 03 to my format
			var d = new Date(obj.phasedata[i].date);
			d.setTime(d.getTime() + 86400000 + phodays.holidays[k].offset * 86400000); //might not be exaclty correct
			phodays.holidays[k].date = d.toISOString().substring(0, 10);
			return;
		}
	}
}
function getIslamic(year, k, searchstring){
	var request = require('sync-request');
	var url = "http://api.usno.navy.mil/islamic?year=" + year.toString();
	var res = request('GET', url);
	for(var i = 0; i < obj.data.length; i++){
		if(obj.data[i].holiday == searchstring){
			var d = new Date(obj.data[i].year.toString() + '-' + padout(obj.data[i].month) + '-' + padout(obj.data[i].day));
			d.setTime(d.getTime() + phodays.holidays[k].offset * 86400000); //add offset (ie for eid al fitr)
			phodays.holidays[k].date = d.toISOString().substring(0, 10);
			return;
		}
	}
}


function padout(number) { return (number < 10) ? '0' + number : number; }

//used in mains.js when requesting calender for country
module.exports = {
		getHolidays: function (year){
			phodays = JSON.parse(JSON.stringify(container));
			processForYear(year);
			return phodays;
		}
}