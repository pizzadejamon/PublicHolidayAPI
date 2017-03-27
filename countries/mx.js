//Country File for Mexico / Mexiko - PublicHolidayAPI
//author: Marius Riehl
//date:	  2017-03-24
//change: 2017-03-24

var basiccalc = require('./../basiccalc.js');

//object containing mexico holidays
var phodays;
var container = {
		"num": 7,
		"holidays":[
			{
				"name": "Año Nuevo",
				"tname": "New Year's Day",
				"region": "MX: Nationwide / Statutory",
				"date": "",
				"type": 0,
				"day": "01-01"
			},
			{
				"name": "Día del Trabajo",
				"tname": "Labor Day",
				"region": "MX: Nationwide / Statutory",
				"date": "",
				"type": 0,
				"day": "05-01"
			},
			{
				"name": "Día de la Independencia",
				"tname": "Independence Day",
				"region": "MX: Nationwide / Statutory",
				"date": "",
				"type": 0,
				"day": "09-16"
			},
			{
				"name": "Navidad",
				"tname": "Christmas Day",
				"region": "MX: Nationwide / Statutory",
				"date": "",
				"type": 0,
				"day": "12-25"
			},
			{ //first monday of february
				"name": "Día de la Constitución",
				"tname": "Constitution Day",
				"region": "MX: Nationwide / Statutory",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 2,
				"offset": 0
			},
			{ //third monday of march
				"name": "Natalicio de Benito Juárez",
				"tname": "Benito Juárez's birthday",
				"region": "MX: Nationwide / Statutory",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 3,
				"offset": 2
			},
			{ //third monday of november
				"name": "Día de la Revolución",
				"tname": "Revolution Day",
				"region": "MX: Nationwide / Statutory",
				"date": "",
				"type": 2,
				"day": 1,
				"month": 11,
				"offset": 2
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
		}
	}
	
	//Saturday / Sunday exepctions
	for(var i = 0; i < phodays.num; i++){
		if(phodays.holidays[i].type == 0){
			var dummyDay = {
					"name": "",
					"tname": "",
					"region": "MX: Nationwide / Statutory",
					"date": ""
			};
			let d = new Date(year.toString() + "-" + phodays.holidays[i].day);
			dummyDay.name = phodays.holidays[i].name + " observado";
			dummyDay.tname = phodays.holidays[i].tname + " observed";
			if(d.getDay() == 0){
				var p = d; p.setDate(p.getDate() + 1);
				dummyDay.date = p.toISOString().substring(0, 10);
				phodays.num++;phodays.holidays.push(dummyDay);
			}else if(d.getDay() == 6){
				var q = d; q.setDate(q.getDate() - 1)
				dummyDay.date = q.toISOString().substring(0, 10);
				phodays.num++;phodays.holidays.push(dummyDay);
			}
		}
	}
}



module.exports = {
		getHolidays: function (year){
			phodays = JSON.parse(JSON.stringify(container));
			processForYear(year);
			return phodays;
		}
}